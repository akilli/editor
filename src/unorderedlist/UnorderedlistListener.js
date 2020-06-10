import Listener from '../base/Listener.js';

/**
 * Handles unorderedlist elements
 */
export default class UnorderedlistListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertul', this);
    }

    /**
     * Initializes unorderedlist elements
     *
     * @param {CustomEvent} event
     * @param {HTMLUListElement} event.detail.element
     */
    insertul(event) {
        if (event.detail.element.children.length === 0) {
            event.detail.element.appendChild(this.editor.createElement('li'));
        }
    }
}
