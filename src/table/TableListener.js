import Listener from '../base/Listener.js';

/**
 * Table Listener
 */
export default class TableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('inserttable', this);
        this.editor.content.addEventListener('inserttd', this);
        this.editor.content.addEventListener('insertth', this);
    }

    /**
     * Initializes table elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLTableElement} event.detail.element
     */
    inserttable(event) {
        this.editor.wrap(event.detail.element, 'figure', {attributes: {class: 'table'}});

        if (event.detail.element.tBodies.length > 0
            && event.detail.element.tBodies[0].rows[0]
            && (!event.detail.element.tHead || !event.detail.element.tFoot)
        ) {
            if (!event.detail.element.tHead) {
                this.createRow(event.detail.element.createTHead(), event.detail.element.tBodies[0].rows[0].cells.length);
            }

            if (!event.detail.element.tFoot) {
                this.createRow(event.detail.element.createTFoot(), event.detail.element.tBodies[0].rows[0].cells.length);
            }
        }
    }

    /**
     * Initializes table cell elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLTableCellElement} event.detail.element
     */
    inserttd(event) {
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Initializes table cell elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLTableHeaderCellElement} event.detail.element
     */
    insertth(event) {
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Handles key combinations for sorting
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLTableCellElement} event.target
     */
    keydown(event) {
        const cell = event.target;
        const row = cell.parentElement;
        const base = row.parentElement;
        const table = base instanceof HTMLTableElement ? base : base.parentElement;
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

        if (cell instanceof HTMLTableCellElement
            && row instanceof HTMLTableRowElement
            && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
            && table instanceof HTMLTableElement
            && (this.editor.isKey(event, keys, {alt: true}) || this.editor.isKey(event, keys, {alt: true, shift: true}))
        ) {
            const length = row.cells.length;
            const rowLength = base.rows.length;
            const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;

            event.preventDefault();
            event.stopPropagation();

            if (event.shiftKey) {
                if (event.key === 'ArrowLeft' && cell.cellIndex > 0) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cell.cellIndex - 1));
                } else if (event.key === 'ArrowRight' && cell.cellIndex < length - 1) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cell.cellIndex + 1));
                } else if (event.key === 'ArrowUp' && rowIndex > 0) {
                    base.deleteRow(rowIndex - 1)
                } else if (event.key === 'ArrowDown' && rowIndex < rowLength - 1) {
                    base.deleteRow(rowIndex + 1)
                }
            } else if (event.key === 'ArrowLeft') {
                Array.from(table.rows).forEach(item => this.createCell(item, item.cells[cell.cellIndex]));
            } else if (event.key === 'ArrowRight') {
                console.log(table, table.rows);
                Array.from(table.rows).forEach(item => this.createCell(item, item.cells[cell.cellIndex + 1]));
            } else if (event.key === 'ArrowUp') {
                this.createRow(base, length, rowIndex);
            } else if (event.key === 'ArrowDown') {
                this.createRow(base, length, rowIndex + 1);
            }
        }
    }

    /**
     * Creates table row
     *
     * @private
     * @param {HTMLTableElement|HTMLTableSectionElement} element
     * @param {Number} length
     * @param {Number} [index = 0]
     */
    createRow(element, length, index = 0) {
        const row = element.insertRow(index);

        for (let i = 0; i < length; i++) {
            this.createCell(row);
        }
    }

    /**
     * Creates table cell
     *
     * @private
     * @param {HTMLTableRowElement} element
     * @param {?HTMLTableCellElement} [ref = null]
     */
    createCell(element, ref = null) {
        const name = element.parentElement.localName === 'thead' ? 'th' : 'td';
        element.insertBefore(this.editor.createElement(name), ref);
    }
}
