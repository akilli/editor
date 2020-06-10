import Listener from '../base/Listener.js';

/**
 * Handles div elements
 */
export default class DivListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertdiv', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLDivElement} event.detail.element
     */
    insertdiv(event) {
        if (!event.detail.element.querySelector(':scope > slot')) {
            event.detail.element.appendChild(this.editor.createElement('slot'));
        }
    }
}
