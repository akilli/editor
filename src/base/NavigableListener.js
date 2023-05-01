import Key, { isKey } from './Key.js';
import Listener from './Listener.js';

export default class NavigableListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-navigable')) {
            element.tabIndex = 0;
            element.addEventListener('keydown', this);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (
            event.target === event.currentTarget &&
            isKey(event, [Key.ARROWUP, Key.ARROWDOWN, Key.HOME, Key.END]) &&
            this.#enabled(event.target)
        ) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === Key.ARROWUP && !isFirst && prev.hasAttribute('data-navigable')) {
                prev.focus();
            } else if (event.key === Key.ARROWDOWN && !isLast && next.hasAttribute('data-navigable')) {
                next.focus();
            } else if (
                (event.key === Key.HOME || (event.key === Key.ARROWDOWN && isLast)) &&
                first.hasAttribute('data-navigable')
            ) {
                first.focus();
            } else if (
                (event.key === Key.END || (event.key === Key.ARROWUP && isFirst)) &&
                last.hasAttribute('data-navigable')
            ) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Indicates if navigation is enabled for element
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
