import Listener from '../base/Listener.js';

/**
 * Handles quote elements
 */
export default class QuoteListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertblockquote', this);
        this.editor.content.addEventListener('deleteblockquote', this);
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLQuoteElement} event.detail.element
     */
    insertblockquote(event) {
        this.editor.wrap(event.detail.element, 'figure', {attributes: {class: 'quote'}});
    }

    /**
     * Removes parent figure element
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     */
    deleteblockquote(event) {
        if (event.detail.target.localName === 'figure' && event.detail.target.classList.contains('quote')) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
