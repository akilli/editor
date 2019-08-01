import Observer from './Observer.js';

/**
 * Table observer to create missing table sections
 */
export default class TableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            let table;
            let tr;

            if (node instanceof HTMLTableElement) {
                table = node;
            } else if (node instanceof HTMLElement) {
                table = node.querySelector(':scope > table');
            }

            if (table && (tr = table.querySelector('tbody > tr:first-child'))) {
                const length = tr.cells.length;

                if (!table.tHead) {
                    tr = table.createTHead().insertRow(-1);

                    for (let i = 0; i < length; i++) {
                        tr.appendChild(this.editor.document.createElement('th'));
                    }
                }

                if (!table.tFoot) {
                    tr = table.createTFoot().insertRow(-1);

                    for (let i = 0; i < length; i++) {
                        tr.appendChild(this.editor.document.createElement('td'));
                    }
                }
            }
        }));
    }
}
