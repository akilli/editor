import Observer from './Observer.js';

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
                this.initTable(node)
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('table').forEach(item => this.initTable(item));
            }
        }));
    }

    /**
     * Initializes table
     *
     * @private
     *
     * @param {HTMLTableElement} table
     */
    initTable(table) {
        table.addEventListener('keydown', ev => {
            const cell = ev.target;
            const row = cell.parentElement;
            const base = row.parentElement;

            if (cell instanceof HTMLTableCellElement
                && row instanceof HTMLTableRowElement
                && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
                && ev.ctrlKey
                && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)
            ) {
                let length = row.cells.length;
                let index;

                if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? 0 : 1);
                    Array.from(table.rows).forEach(item => {
                        if (!item.querySelector(':scope > td')) {
                            item.insertBefore(this.editor.document.createElement('th'), item.cells[index]);
                        } else {
                            item.insertCell(index);
                        }
                    });
                } else {
                    index = (base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex) + (ev.key === 'ArrowUp' ? 0 : 1);
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
