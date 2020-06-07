import Observer from '../base/Observer.js';

/**
 * Handles list elements
 */
export default class ListObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof HTMLOListElement || node instanceof HTMLUListElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('ol, ul').forEach(item => this.init(item));
                }
            });

            if (record.removedNodes.length > 0
                && (record.target instanceof HTMLOListElement || record.target instanceof HTMLUListElement)
                && record.target.children.length === 0
            ) {
                record.target.parentElement.removeChild(record.target);
            }
        });
    }

    /**
     * Initializes orderedlist element
     *
     * @private
     * @param {HTMLOListElement|HTMLUListElement} node
     */
    init(node) {
        if (node.children.length === 0) {
            node.appendChild(this.editor.createElement('li'));
        }
    }
}
