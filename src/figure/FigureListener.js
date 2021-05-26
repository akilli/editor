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
        this.editor.root.addEventListener('insertfigure', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insertfigure(event) {
        if (!event.detail.element.querySelector(':scope > figcaption')) {
            event.detail.element.appendChild(this.editor.dom.createElement('figcaption'));
        }
    }
}
