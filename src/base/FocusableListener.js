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
     * @param {HTMLElement} element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-focusable')) {
            element.focus();
        }
    }
}
