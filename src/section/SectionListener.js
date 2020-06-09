import Listener from '../base/Listener.js';

/**
 * Handles section elements
 */
export default class SectionListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertsection', this);
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insertsection(event) {
        if (!event.detail.element.querySelector(':scope > slot')) {
            event.detail.element.appendChild(this.editor.createElement('slot'));
        }
    }
}
