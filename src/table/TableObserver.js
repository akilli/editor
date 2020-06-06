import Observer from '../base/Observer.js';

/**
 * Table Observer
 */
export default class TableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
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
        table.addEventListener('keydown', ev => {
            const cell = ev.target;
            const row = cell.parentElement;
            const base = row.parentElement;
            const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

            if (cell instanceof HTMLTableCellElement
                && row instanceof HTMLTableRowElement
                && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
                && (this.editor.isKey(ev, keys, {alt: true}) || this.editor.isKey(ev, keys, {alt: true, shift: true}))
            ) {
                const length = row.cells.length;
                const rowLength = base.rows.length;
                const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
                let index;

                if (ev.shiftKey && (ev.key === 'ArrowLeft' && cell.cellIndex > 0 || ev.key === 'ArrowRight' && cell.cellIndex < length - 1)) {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? -1 : 1);
                    Array.from(table.rows).forEach(item => item.deleteCell(index));
                } else if (ev.shiftKey && (ev.key === 'ArrowUp' && rowIndex > 0 || ev.key === 'ArrowDown' && rowIndex < rowLength - 1)) {
                    index = rowIndex + (ev.key === 'ArrowUp' ? -1 : 1);
                    base.deleteRow(index)
                } else if (!ev.shiftKey && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? 0 : 1);
                    Array.from(table.rows).forEach(item => {
                        if (item.parentElement.localName === 'thead') {
                            item.insertBefore(this.editor.createElement('th'), item.cells[index]);
                        } else {
                            item.insertCell(index);
                        }
                    });
                } else if (!ev.shiftKey && (ev.key === 'ArrowUp' || ev.key === 'ArrowDown')) {
                    index = rowIndex + (ev.key === 'ArrowUp' ? 0 : 1);
                    const r = base.insertRow(index);

                    for (let i = 0; i < length; i++) {
                        if (r.parentElement.localName === 'thead') {
                            r.appendChild(this.editor.createElement('th'));
                        } else {
                            r.insertCell();
                        }
                    }
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
