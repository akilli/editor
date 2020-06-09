import Listener from '../base/Listener.js';

/**
 * Slot Listener
 */
export default class SlotListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertslot', this);
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLSlotElement} event.detail.element
     */
    insertslot(event) {
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Disables all keyboard events
     *
     * @private
     * @param {KeyboardEvent} event
     */
    keydown(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
