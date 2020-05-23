import Observer from '../base/Observer.js';

/**
 * Table Observer
 */
export default class TableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLTableElement) {
                this.init(node)
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('table').forEach(table => this.init(table));
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

            if (cell instanceof HTMLTableCellElement
                && row instanceof HTMLTableRowElement
                && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
                && (ev.altKey || ev.ctrlKey)
                && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)
            ) {
                const length = row.cells.length;
                const rowLength = base.rows.length;
                const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
                let index;

                if (ev.altKey && (ev.key === 'ArrowLeft' && cell.cellIndex > 0 || ev.key === 'ArrowRight' && cell.cellIndex < length - 1)) {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? -1 : 1);
                    Array.from(table.rows).forEach(item => item.deleteCell(index));
                } else if (ev.altKey && (ev.key === 'ArrowUp' && rowIndex > 0 || ev.key === 'ArrowDown' && rowIndex < rowLength - 1)) {
                    index = rowIndex + (ev.key === 'ArrowUp' ? -1 : 1);
                    base.deleteRow(index)
                } else if (ev.ctrlKey && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? 0 : 1);
                    Array.from(table.rows).forEach(item => {
                        if (!item.querySelector(':scope > td')) {
                            item.cells[index].insertAdjacentElement('beforebegin', this.editor.createElement('th'));
                        } else {
                            item.insertCell(index);
                        }
                    });
                } else if (ev.ctrlKey && (ev.key === 'ArrowUp' || ev.key === 'ArrowDown')) {
                    index = rowIndex + (ev.key === 'ArrowUp' ? 0 : 1);
                    const r = base.insertRow(index);

                    for (let i = 0; i < length; i++) {
                        r.insertCell();
                    }
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
