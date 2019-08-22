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
     * @param {HTMLTableElement} node
     */
    initTable(node) {
        let tr = node.querySelector('tbody > tr:first-child');

        if (tr) {
            const length = tr.cells.length;

            if (!node.tHead) {
                tr = node.createTHead().insertRow(-1);

                for (let i = 0; i < length; i++) {
                    tr.appendChild(this.editor.document.createElement('th'));
                }
            }

            if (!node.tFoot) {
                tr = node.createTFoot().insertRow(-1);

                for (let i = 0; i < length; i++) {
                    tr.appendChild(this.editor.document.createElement('td'));
                }
            }
        }
    }
}
