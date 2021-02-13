import Listener from '../base/Listener.js';

/**
 * Handles block quote elements
 */
export default class BlockQuoteListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertblockquote', this);
        this.editor.root.addEventListener('deleteblockquote', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLQuoteElement} event.detail.element
     */
    insertblockquote(event) {
        this.editor.wrap(event.detail.element, 'figure', {attributes: {class: 'quote'}});
    }

    /**
     * Removes parent figure element
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     */
    deleteblockquote(event) {
        if (event.detail.target.localName === 'figure' && event.detail.target.classList.contains('quote')) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
