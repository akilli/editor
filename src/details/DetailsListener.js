import Listener from '../base/Listener.js';

/**
 * Handles details elements
 */
export default class DetailsListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertdetails', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLDetailsElement} event.detail.element
     */
    insertdetails(event) {
        event.detail.element.open = true;

        if (!event.detail.element.querySelector(':scope > summary:first-child')) {
            event.detail.element.insertAdjacentElement('afterbegin', this.editor.createElement('summary'));
        }

        if (!event.detail.element.querySelector(':scope > slot')) {
            event.detail.element.appendChild(this.editor.createElement('slot'));
        }
    }
}
