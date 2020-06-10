import Listener from '../base/Listener.js';

/**
 * Handles orderedlist elements
 */
export default class OrderedlistListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertol', this);
    }

    /**
     * Initializes orderedlist elements
     *
     * @param {CustomEvent} event
     * @param {HTMLUListElement} event.detail.element
     */
    insertol(event) {
        if (event.detail.element.children.length === 0) {
            event.detail.element.appendChild(this.editor.createElement('li'));
        }
    }
}
