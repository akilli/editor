import Key, { isEventFor } from './Key.js';
import Listener from './Listener.js';
import TagName from './TagName.js';

export default class SlotableListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
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
     * @param {KeyboardEvent} event
     * @param {HTMLSlotElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (isEventFor(event, Key.BACKSPACE) && event.target.matches(':only-child')) {
            this.editor.dom.delete(event.target.parentElement);
        } else if (!isEventFor(event, Key.TAB) && !isEventFor(event, Key.TAB, { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
