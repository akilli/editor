import Observer from '../base/Observer.js';

/**
 * Table Observer
 */
export default class TableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node instanceof HTMLTableElement) {
                    this.initTable(node);
                } else if (node instanceof HTMLTableCellElement) {
                    this.initCell(node);
                }

                node.querySelectorAll('table').forEach(item => this.initTable(item));
                node.querySelectorAll('td, th').forEach(item => this.initCell(item));
            }
        }));
    }

    /**
     * Initializes table element
     *
     * @private
     * @param {HTMLTableElement} node
     */
    initTable(node) {
        if (!(node.parentElement instanceof HTMLElement) || node.parentElement.localName !== 'figure') {
            const figure = this.editor.createElement('figure', {attributes: {class: 'table'}});
            node.insertAdjacentElement('beforebegin', figure);
            figure.insertAdjacentElement('afterbegin', node);
        }

        if (node.tBodies.length > 0 && node.tBodies[0].rows[0] && (!node.tHead || !node.tFoot)) {
            if (!node.tHead) {
                this.createRow(node.createTHead(), node.tBodies[0].rows[0].cells.length);
            }

            if (!node.tFoot) {
                this.createRow(node.createTFoot(), node.tBodies[0].rows[0].cells.length);
            }
        }
    }

    /**
     * Initializes table cell element
     *
     * @private
     * @param {HTMLTableCellElement} node
     */
    initCell(node) {
        node.addEventListener('keydown', this);
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
     * @param {HTMLTableElement|HTMLTableSectionElement} node
     * @param {Number} length
     * @param {Number} [index = 0]
     */
    createRow(node, length, index = 0) {
        const row = node.insertRow(index);

        for (let i = 0; i < length; i++) {
            this.createCell(row);
        }
    }

    /**
     * Creates table cell
     *
     * @private
     * @param {HTMLTableRowElement} node
     * @param {?HTMLTableCellElement} [ref = null]
     */
    createCell(node, ref = null) {
        const name = node.parentElement.localName === 'thead' ? 'th' : 'td';
        node.insertBefore(this.editor.createElement(name), ref);
    }
}
