import Listener from '../base/Listener.js';
import {is} from '../base/util.js';

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
        if (is(event.detail.target, 'figure') && event.detail.target.classList.contains('quote')) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
