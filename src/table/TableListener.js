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
        this.editor.root.addEventListener('inserttable', this);
        this.editor.root.addEventListener('inserttd', this);
        this.editor.root.addEventListener('insertth', this);
    }

    /**
     * Initializes table elements
     *
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
                this.__row(event.detail.element.createTHead(), event.detail.element.tBodies[0].rows[0].cells.length);
            }

            if (!event.detail.element.tFoot) {
                this.__row(event.detail.element.createTFoot(), event.detail.element.tBodies[0].rows[0].cells.length);
            }
        }
    }

    /**
     * Initializes table cell elements
     *
     * @param {CustomEvent} event
     * @param {HTMLTableCellElement} event.detail.element
     */
    inserttd(event) {
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Initializes table cell elements
     *
     * @param {CustomEvent} event
     * @param {HTMLTableHeaderCellElement} event.detail.element
     */
    insertth(event) {
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Handles key combinations for sorting
     *
     * @param {KeyboardEvent} event
     * @param {HTMLTableCellElement} event.target
     */
    keydown(event) {
        const cell = event.target;
        const row = cell.parentElement;
        const base = row.parentElement;
        const table = base instanceof HTMLTableElement ? base : base.parentElement;
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const isNav = this.editor.isKey(event, ['ArrowLeft', 'ArrowRight', 'Home', 'End']);
        const isRowNav = this.editor.isKey(event, ['ArrowUp', 'ArrowDown'])
        const isAdd = this.editor.isKey(event, keys, {alt: true});
        const isDel = this.editor.isKey(event, keys, {alt: true, shift: true});

        if (cell instanceof HTMLTableCellElement
            && row instanceof HTMLTableRowElement
            && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
            && table instanceof HTMLTableElement
            && (isNav && !cell.textContent || isRowNav || isAdd || isDel)
        ) {
            const length = row.cells.length;
            const rowLength = base.rows.length;
            const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
            const isFirst = cell.cellIndex === 0;
            const isLast = cell.cellIndex === length - 1;
            const isFirstTableRow = row.rowIndex === 0;
            const isLastTableRow = row.rowIndex === table.rows.length - 1;

            event.preventDefault();
            event.stopPropagation();

            if (isNav && !cell.textContent) {
                if (event.key === 'ArrowLeft' && !isFirst && !cell.textContent) {
                    row.cells[cell.cellIndex - 1].focus();
                } else if (event.key === 'ArrowRight' && !isLast && !cell.textContent) {
                    row.cells[cell.cellIndex + 1].focus();
                } else if ((event.key === 'Home' || event.key === 'ArrowRight' && isLast) && !cell.textContent) {
                    row.cells[0].focus();
                } else if ((event.key === 'End' || event.key === 'ArrowLeft' && isFirst) && !cell.textContent) {
                    row.cells[length - 1].focus();
                }
            } else if (isRowNav) {
                if (event.key === 'ArrowUp' && !isFirstTableRow) {
                    table.rows[row.rowIndex - 1].cells[cell.cellIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    table.rows[table.rows.length - 1].cells[cell.cellIndex].focus();
                } else if (event.key === 'ArrowDown' && !isLastTableRow) {
                    table.rows[row.rowIndex + 1].cells[cell.cellIndex].focus();
                } else if (event.key === 'ArrowDown') {
                    table.rows[0].cells[cell.cellIndex].focus();
                }
            } else if (isAdd) {
                if (event.key === 'ArrowLeft') {
                    Array.from(table.rows).forEach(item => this.__cell(item, item.cells[cell.cellIndex]));
                } else if (event.key === 'ArrowRight') {
                    Array.from(table.rows).forEach(item => this.__cell(item, item.cells[cell.cellIndex + 1]));
                } else if (event.key === 'ArrowUp') {
                    this.__row(base, length, rowIndex);
                } else if (event.key === 'ArrowDown') {
                    this.__row(base, length, rowIndex + 1);
                }
            } else if (isDel) {
                if (event.key === 'ArrowLeft' && !isFirst) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cell.cellIndex - 1));
                } else if (event.key === 'ArrowRight' && !isLast) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cell.cellIndex + 1));
                } else if (event.key === 'ArrowUp' && rowIndex > 0) {
                    base.deleteRow(rowIndex - 1)
                } else if (event.key === 'ArrowDown' && rowIndex < rowLength - 1) {
                    base.deleteRow(rowIndex + 1)
                }
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
    __row(element, length, index = 0) {
        const row = element.insertRow(index);

        for (let i = 0; i < length; i++) {
            this.__cell(row);
        }
    }

    /**
     * Creates table cell
     *
     * @private
     * @param {HTMLTableRowElement} element
     * @param {?HTMLTableCellElement} [ref = null]
     */
    __cell(element, ref = null) {
        const name = element.parentElement.localName === 'thead' ? 'th' : 'td';
        element.insertBefore(this.editor.createElement(name), ref);
    }
}
