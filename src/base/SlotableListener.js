import Listener from './Listener.js';
import TagName from './TagName.js';
import { Key, isKey } from './Key.js';

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
        if (isKey(event, Key.BACKSPACE) && event.target.matches(':only-child')) {
            this.editor.dom.delete(event.target.parentElement);
        } else if (!isKey(event, Key.TAB) && !isKey(event, Key.TAB, { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
