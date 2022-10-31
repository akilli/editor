import Listener from './Listener.js';
import { Key } from './enum.js';
import { isKey } from './util.js';

/**
 * Navigable Listener
 */
export default class NavigableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-navigable')) {
            element.tabIndex = 0;
            element.addEventListener('keydown', this);
        }
    }

    /**
     * Handles key combinations for navigation
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (event.target === event.currentTarget
            && isKey(event, [Key.UP, Key.DOWN, Key.HOME, Key.END])
            && this.#enabled(event.target)
        ) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === Key.UP && !isFirst && prev.hasAttribute('data-navigable')) {
                prev.focus();
            } else if (event.key === Key.DOWN && !isLast && next.hasAttribute('data-navigable')) {
                next.focus();
            } else if ((event.key === Key.HOME || event.key === Key.DOWN && isLast)
                && first.hasAttribute('data-navigable')
            ) {
                first.focus();
            } else if ((event.key === Key.END || event.key === Key.UP && isFirst)
                && last.hasAttribute('data-navigable')
            ) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Enables or disables navigation for contenteditable elements
     *
     * @param {HTMLElement} element
     * @return {boolean}
     */
    #enabled(element) {
        if (element.contentEditable !== 'true') {
            return true;
        }

        const sel = this.editor.dom.getSelection();
        const editable = this.editor.dom.getSelectedEditable();
        const selected = this.editor.dom.getSelectedElement();

        return sel.isCollapsed && sel.anchorOffset === 0 && [editable, element.firstChild].includes(selected);
    }
}
