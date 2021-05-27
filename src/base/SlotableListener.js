import Listener from './Listener.js';
import { TagName } from './enum.js';

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
     * @return {void}
     */
    insert(event) {
        if (event.detail.element instanceof HTMLSlotElement) {
            event.detail.element.addEventListener('keydown', this);
        } else if (event.detail.element.hasAttribute('data-slotable')
            && !event.detail.element.querySelector(':scope > ' + TagName.SLOT)
        ) {
            event.detail.element.appendChild(this.editor.dom.createElement(TagName.SLOT));
        }
    }

    /**
     * Disables all keyboard events for slot elements
     *
     * @param {KeyboardEvent} event
     * @return {void}
     */
    keydown(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
