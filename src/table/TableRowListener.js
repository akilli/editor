import Key, { isKey } from '../base/Key.js';
import Listener from '../base/Listener.js';

export default class TableRowListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('inserttr', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLTableRowElement} event.detail.element
     * @return {void}
     */
    inserttr({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLTableRowElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (isKey(event, Key.ENTER)) {
            this.editor.dom.createTableRowAfter(event.target);
        } else if (
            isKey(event, Key.BACKSPACE) &&
            !event.target.textContent &&
            event.target.hasAttribute('data-deletable')
        ) {
            this.editor.dom.delete(event.target);
        }
    }
}
