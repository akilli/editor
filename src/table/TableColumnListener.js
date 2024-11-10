import Key, { isKey } from '../base/Key.js';
import Listener from '../base/Listener.js';

export default class TableColumnListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertcol', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLTableColElement} event.detail.element
     * @return {void}
     */
    insertcol({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLTableColElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (isKey(event, Key.ENTER)) {
            this.editor.dom.createTableColumnAfter(event.target);
        } else if (
            isKey(event, Key.BACKSPACE) &&
            !event.target.textContent &&
            event.target.hasAttribute('data-deletable')
        ) {
            this.editor.dom.delete(event.target);
        }
    }
}
