import Listener from './Listener.js';

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
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert(event) {
        if (event.detail.element.hasAttribute('data-navigable')) {
            event.detail.element.tabIndex = 0;
            event.detail.element.addEventListener('keydown', this);
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
            && this.editor.isKey(event, ['ArrowUp', 'ArrowDown', 'Home', 'End'])
            && this.#enabled(event.target)
        ) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === 'ArrowUp' && !isFirst && prev.hasAttribute('data-navigable')) {
                prev.focus();
            } else if (event.key === 'ArrowDown' && !isLast && next.hasAttribute('data-navigable')) {
                next.focus();
            } else if ((event.key === 'Home' || event.key === 'ArrowDown' && isLast)
                && first.hasAttribute('data-navigable')
            ) {
                first.focus();
            } else if ((event.key === 'End' || event.key === 'ArrowUp' && isFirst)
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

        const sel = this.editor.window.getSelection();
        const editable = this.editor.getSelectedEditable();
        const selected = this.editor.getSelectedElement();

        return sel.isCollapsed && sel.anchorOffset === 0 && [editable, element.firstChild].includes(selected);
    }
}
