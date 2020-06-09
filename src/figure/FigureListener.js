import Listener from '../base/Listener.js';

/**
 * Creates missing figcaption elements
 */
export default class FigureListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertfigure', this);
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insertfigure(event) {
        if (!event.detail.element.querySelector(':scope > figcaption')) {
            event.detail.element.appendChild(this.editor.createElement('figcaption'));
        }
    }
}
