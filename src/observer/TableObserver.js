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

            if (cell instanceof HTMLTableCellElement
                && row instanceof HTMLTableRowElement
                && ev.ctrlKey
                && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)
            ) {
                let length = row.cells.length;
                let index;

                if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
                    index = cell.cellIndex + (ev.key === 'ArrowLeft' ? 0 : 1);
                    Array.from(table.rows).forEach(item => item.insertCell(index));
                } else {
                    index = row.rowIndex + (ev.key === 'ArrowUp' ? 0 : 1);
                    const r = table.insertRow(index);

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
