import Listener from './Listener.js';
import { Key, TagName } from './enum.js';
import { isKey } from './util.js';

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
     * @param {HTMLElement} element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element instanceof HTMLSlotElement) {
            element.addEventListener('keydown', this);
        } else if (element.hasAttribute('data-slotable') && !element.querySelector(':scope > ' + TagName.SLOT)) {
            this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.SLOT), element);
        }
    }

    /**
     * Disables all keyboard events for slot elements except `Tab` or `Shift + Tab`
     *
     * @param {KeyboardEvent} event
     * @return {void}
     */
    keydown(event) {
        if (!isKey(event, Key.TAB) && !isKey(event, Key.TAB, { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
