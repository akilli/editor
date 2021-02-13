import Listener from './Listener.js';

/**
 * Focusable Listener
 */
export default class FocusableListener extends Listener {
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
     */
    insert(event) {
        if (event.detail.element.hasAttribute('data-focusable')) {
            event.detail.element.focus();
        }
    }
}
