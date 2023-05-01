import Key, { isKey } from '../base/Key.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class TableCellListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('inserttd', this);
        this.editor.root.addEventListener('insertth', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLTableCellElement} event.detail.element
     * @return {void}
     */
    inserttd({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLTableCellElement} event.detail.element
     * @return {void}
     */
    insertth({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLTableCellElement} event.target
     * @return {void}
     */
    keydown(event) {
        const cell = event.target;
        const row = cell.parentElement;
        const table = cell.closest(TagName.TABLE);

        if (
            cell instanceof HTMLTableCellElement &&
            row instanceof HTMLTableRowElement &&
            table instanceof HTMLTableElement &&
            isKey(event, [Key.ARROWLEFT, Key.ARROWRIGHT, Key.ARROWUP, Key.ARROWDOWN]) &&
            this.#enabled(cell, event.key)
        ) {
            const cellIndex = cell.cellIndex;
            const cellLength = row.cells.length;
            const isFirst = cellIndex === 0;
            const isLast = cellIndex === cellLength - 1;
            const isFirstTableRow = row.rowIndex === 0;
            const isLastTableRow = row.rowIndex === table.rows.length - 1;

            event.preventDefault();
            event.stopPropagation();

            if (event.key === Key.ARROWLEFT && !isFirst) {
                this.editor.dom.focusEnd(row.cells[cellIndex - 1]);
            } else if (event.key === Key.ARROWLEFT && isFirstTableRow) {
                this.editor.dom.focusEnd(table.rows[table.rows.length - 1].cells[cellLength - 1]);
            } else if (event.key === Key.ARROWLEFT) {
                this.editor.dom.focusEnd(table.rows[row.rowIndex - 1].cells[cellLength - 1]);
            } else if (event.key === Key.ARROWRIGHT && !isLast) {
                row.cells[cellIndex + 1].focus();
            } else if (event.key === Key.ARROWRIGHT && isLastTableRow) {
                table.rows[0].cells[0].focus();
            } else if (event.key === Key.ARROWRIGHT) {
                table.rows[row.rowIndex + 1].cells[0].focus();
            } else if (event.key === Key.ARROWUP && isFirstTableRow) {
                table.rows[table.rows.length - 1].cells[cellIndex].focus();
            } else if (event.key === Key.ARROWUP) {
                table.rows[row.rowIndex - 1].cells[cellIndex].focus();
            } else if (event.key === Key.ARROWDOWN && isLastTableRow) {
                table.rows[0].cells[cellIndex].focus();
            } else if (event.key === Key.ARROWDOWN) {
                table.rows[row.rowIndex + 1].cells[cellIndex].focus();
            }
        }
    }

    /**
     * Enables or disables navigation for table cell elements
     *
     * @param {HTMLTableCellElement} element
     * @param {string} key
     * @return {boolean}
     */
    #enabled(element, key) {
        if ([Key.ARROWUP, Key.ARROWDOWN].includes(key)) {
            return true;
        }

        const sel = this.editor.dom.getSelection();
        const anc = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : element;

        if (!sel.isCollapsed) {
            return false;
        }

        if (key === Key.ARROWLEFT) {
            let first = element.firstChild;

            if (first instanceof HTMLElement) {
                first = first.firstChild;
            }

            return sel.anchorOffset === 0 && [element, first].includes(anc);
        }

        let last = element.lastChild;

        if (element.lastChild instanceof HTMLBRElement && element.lastChild.previousSibling) {
            last = element.lastChild.previousSibling;
        }

        if (last instanceof HTMLElement) {
            last = last.lastChild;
        }

        return sel.anchorOffset === anc.textContent.length && [element, last].includes(anc);
    }
}
