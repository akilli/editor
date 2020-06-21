import Listener from './Listener.js';

/**
 * Slotable Listener
 */
export default class SlotableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        if (event.detail.element instanceof HTMLSlotElement) {
            event.detail.element.addEventListener('keydown', this);
        } else if (event.detail.element.hasAttribute('data-slotable') && !event.detail.element.querySelector(':scope > slot')) {
            event.detail.element.appendChild(this.editor.createElement('slot'));
        }
    }

    /**
     * Disables all keyboard events for slot elements
     *
     * @param {KeyboardEvent} event
     */
    keydown(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
