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
            if (node instanceof HTMLTableElement) {
                this.init(node)
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('table').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes table
     *
     * @private
     * @param {HTMLTableElement} table
     */
    init(table) {
        this.sections(table);
        this.keyboard(table);
    }

    /**
     * Creates missing table sections
     *
     * @private
     * @param {HTMLTableElement} table
     */
    sections(table) {
        if (table.tBodies.length > 0 && table.tBodies[0].rows[0] && (!table.tHead || !table.tFoot)) {
            const length = table.tBodies[0].rows[0].cells.length;
            let row;

            if (!table.tHead) {
                row = table.createTHead().insertRow();

                for (let i = 0; i < length; i++) {
                    row.appendChild(this.editor.createElement('th'));
                }
            }

            if (!table.tFoot) {
                row = table.createTFoot().insertRow();

                for (let i = 0; i < length; i++) {
                    row.insertCell();
                }
            }
        }
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLTableElement} table
     */
    keyboard(table) {
        table.addEventListener('keydown', event => {
            const cell = event.target;
            const row = cell.parentElement;
            const base = row.parentElement;
            const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

            if (cell instanceof HTMLTableCellElement
                && row instanceof HTMLTableRowElement
                && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
                && (this.editor.isKey(event, keys, {alt: true}) || this.editor.isKey(event, keys, {alt: true, shift: true}))
            ) {
                const length = row.cells.length;
                const rowLength = base.rows.length;
                const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
                let index;

                if (event.shiftKey && (event.key === 'ArrowLeft' && cell.cellIndex > 0 || event.key === 'ArrowRight' && cell.cellIndex < length - 1)) {
                    index = cell.cellIndex + (event.key === 'ArrowLeft' ? -1 : 1);
                    Array.from(table.rows).forEach(item => item.deleteCell(index));
                } else if (event.shiftKey && (event.key === 'ArrowUp' && rowIndex > 0 || event.key === 'ArrowDown' && rowIndex < rowLength - 1)) {
                    index = rowIndex + (event.key === 'ArrowUp' ? -1 : 1);
                    base.deleteRow(index)
                } else if (!event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                    index = cell.cellIndex + (event.key === 'ArrowLeft' ? 0 : 1);
                    Array.from(table.rows).forEach(item => {
                        if (item.parentElement.localName === 'thead') {
                            item.insertBefore(this.editor.createElement('th'), item.cells[index]);
                        } else {
                            item.insertCell(index);
                        }
                    });
                } else if (!event.shiftKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
                    index = rowIndex + (event.key === 'ArrowUp' ? 0 : 1);
                    const r = base.insertRow(index);

                    for (let i = 0; i < length; i++) {
                        if (r.parentElement.localName === 'thead') {
                            r.appendChild(this.editor.createElement('th'));
                        } else {
                            r.insertCell();
                        }
                    }
                }

                event.preventDefault();
                event.stopPropagation();
            }
        });
    }
}
