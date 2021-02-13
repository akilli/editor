import Listener from '../base/Listener.js';

/**
 * Handles preformatted text elements
 */
export default class PreformatListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertpre', this);
        this.editor.root.addEventListener('deletepre', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLPreElement} event.detail.element
     */
    insertpre(event) {
        this.editor.wrap(event.detail.element, 'figure', {attributes: {class: 'preformat'}});
    }

    /**
     * Removes parent figure element
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     */
    deletepre(event) {
        if (event.detail.target.localName === 'figure' && event.detail.target.classList.contains('preformat')) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
