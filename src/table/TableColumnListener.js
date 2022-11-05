import Key from '../base/Key.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

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
        if (Key.isEventFor(event, Key.ENTER)) {
            const colgroup = event.target.parentElement;
            const table = colgroup.parentElement;
            const index = Array.from(colgroup.children).indexOf(event.target);
            Array.from(table.rows).forEach((row) =>
                this.editor.dom.insertAfter(this.editor.dom.createElement(row.cells[index].localName), row.cells[index])
            );
            this.editor.dom.insertAfter(this.editor.dom.createElement(TagName.COL), event.target);
        }
    }
}
