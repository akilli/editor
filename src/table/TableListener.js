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
        this._editor.root.addEventListener('inserttable', this);
        this._editor.root.addEventListener('inserttd', this);
        this._editor.root.addEventListener('insertth', this);
    }

    /**
     * Initializes table elements
     *
     * @param {CustomEvent} event
     * @param {HTMLTableElement} event.detail.element
     */
    inserttable(event) {
        this._editor.wrap(event.detail.element, 'figure', {attributes: {class: 'table'}});

        if (event.detail.element.tBodies.length > 0
            && event.detail.element.tBodies[0].rows[0]
            && (!event.detail.element.tHead || !event.detail.element.tFoot)
        ) {
            if (!event.detail.element.tHead) {
                this.#row(event.detail.element.createTHead(), event.detail.element.tBodies[0].rows[0].cells.length);
            }

            if (!event.detail.element.tFoot) {
                this.#row(event.detail.element.createTFoot(), event.detail.element.tBodies[0].rows[0].cells.length);
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
        const isNav = this._editor.isKey(event, keys);
        const isSort = this._editor.isKey(event, keys, {ctrl: true});
        const isAdd = this._editor.isKey(event, keys, {alt: true});
        const isDel = this._editor.isKey(event, keys, {alt: true, shift: true});

        if (cell instanceof HTMLTableCellElement
            && row instanceof HTMLTableRowElement
            && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
            && table instanceof HTMLTableElement
            && (isNav && this.#enabled(cell, event.key) || isSort || isAdd || isDel)
        ) {
            const cellIndex = cell.cellIndex;
            const cellLength = row.cells.length;
            const rowLength = base.rows.length;
            const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
            const isFirst = cellIndex === 0;
            const isLast = cellIndex === cellLength - 1;
            const isFirstRow = rowIndex === 0;
            const isLastRow = rowIndex === rowLength - 1;
            const isFirstTableRow = row.rowIndex === 0;
            const isLastTableRow = row.rowIndex === table.rows.length - 1;

            event.preventDefault();
            event.stopPropagation();

            if (isNav) {
                if (event.key === 'ArrowLeft' && !isFirst) {
                    this._editor.focusEnd(row.cells[cellIndex - 1]);
                } else if (event.key === 'ArrowLeft' && isFirstTableRow) {
                    this._editor.focusEnd(table.rows[table.rows.length - 1].cells[cellLength - 1]);
                } else if (event.key === 'ArrowLeft') {
                    this._editor.focusEnd(table.rows[row.rowIndex - 1].cells[cellLength - 1]);
                } else if (event.key === 'ArrowRight' && !isLast) {
                    row.cells[cellIndex + 1].focus();
                } else if (event.key === 'ArrowRight' && isLastTableRow) {
                    table.rows[0].cells[0].focus();
                } else if (event.key === 'ArrowRight') {
                    table.rows[row.rowIndex + 1].cells[0].focus();
                } else if (event.key === 'ArrowUp' && isFirstTableRow) {
                    table.rows[table.rows.length - 1].cells[cellIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    table.rows[row.rowIndex - 1].cells[cellIndex].focus();
                } else if (event.key === 'ArrowDown' && isLastTableRow) {
                    table.rows[0].cells[cellIndex].focus();
                } else if (event.key === 'ArrowDown') {
                    table.rows[row.rowIndex + 1].cells[cellIndex].focus();
                }
            } else if (isSort) {
                if (event.key === 'ArrowLeft' && cellLength > 1 && isFirst) {
                    Array.from(table.rows).forEach(item => item.appendChild(item.cells[cellIndex]));
                } else if (event.key === 'ArrowLeft' && cellLength > 1) {
                    Array.from(table.rows).forEach(item => item.insertBefore(item.cells[cellIndex], item.cells[cellIndex - 1]));
                } else if (event.key === 'ArrowRight' && cellLength > 1 && isLast) {
                    Array.from(table.rows).forEach(item => item.insertBefore(item.cells[cellIndex], item.cells[0]));
                } else if (event.key === 'ArrowRight' && cellLength > 1) {
                    Array.from(table.rows).forEach(item => item.insertBefore(item.cells[cellIndex + 1], item.cells[cellIndex]));
                } else if (event.key === 'ArrowUp' && rowLength > 1 && isFirstRow) {
                    base.appendChild(row);
                } else if (event.key === 'ArrowUp' && rowLength > 1) {
                    base.insertBefore(row, base.rows[rowIndex - 1]);
                } else if (event.key === 'ArrowDown' && rowLength > 1 && isLastRow) {
                    base.insertBefore(row, base.rows[0]);
                } else if (event.key === 'ArrowDown' && rowLength > 1) {
                    base.insertBefore(base.rows[rowIndex + 1], row);
                }

                cell.focus();
            } else if (isAdd) {
                if (event.key === 'ArrowLeft') {
                    Array.from(table.rows).forEach(item => this.#cell(item, item.cells[cellIndex]));
                } else if (event.key === 'ArrowRight') {
                    Array.from(table.rows).forEach(item => this.#cell(item, item.cells[cellIndex + 1]));
                } else if (event.key === 'ArrowUp') {
                    this.#row(base, cellLength, rowIndex);
                } else if (event.key === 'ArrowDown') {
                    this.#row(base, cellLength, rowIndex + 1);
                }
            } else if (isDel) {
                if (event.key === 'ArrowLeft' && !isFirst) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cellIndex - 1));
                } else if (event.key === 'ArrowRight' && !isLast) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cellIndex + 1));
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
     * @param {HTMLTableElement|HTMLTableSectionElement} element
     * @param {Number} length
     * @param {Number} [index = 0]
     */
    #row(element, length, index = 0) {
        const row = element.insertRow(index);

        for (let i = 0; i < length; i++) {
            this.#cell(row);
        }
    }

    /**
     * Creates table cell
     *
     * @param {HTMLTableRowElement} element
     * @param {?HTMLTableCellElement} [ref = null]
     */
    #cell(element, ref = null) {
        const name = element.parentElement.localName === 'thead' ? 'th' : 'td';
        element.insertBefore(this._editor.createElement(name), ref);
    }

    /**
     * Enables or disables navigation for table cell elements
     *
     * @param {HTMLElement} element
     * @param {String} key
     * @return {Boolean}
     */
    #enabled(element, key) {
        if (['ArrowUp', 'ArrowDown'].includes(key)) {
            return true;
        }

        const sel = this._editor.window.getSelection();

        if (!sel.isCollapsed) {
            return false;
        }

        if (key === 'ArrowLeft') {
            const first = element.firstChild instanceof HTMLElement ? element.firstChild.firstChild : element.firstChild;
            return sel.anchorOffset === 0 && [element, first].includes(sel.anchorNode);
        }

        let last = element.lastChild;

        if (element.lastChild instanceof HTMLBRElement && element.lastChild.previousSibling) {
            last = element.lastChild.previousSibling;
        }

        if (last instanceof HTMLElement) {
            last = last.lastChild;
        }

        return sel.anchorOffset === sel.anchorNode.textContent.length && [element, last].includes(sel.anchorNode);
    }
}
