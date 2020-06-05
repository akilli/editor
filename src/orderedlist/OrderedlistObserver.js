import Observer from '../base/Observer.js';

/**
 * Handles orderedlist elements
 */
export default class OrderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof HTMLOListElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('ol').forEach(item => this.init(item));
                }
            });

            if (record.removedNodes.length > 0 && record.target instanceof HTMLOListElement && record.target.children.length === 0) {
                record.target.parentElement.removeChild(record.target);
            }
        });
    }

    /**
     * Initializes orderedlist element
     *
     * @private
     * @param {HTMLOListElement} node
     */
    init(node) {
        if (node.children.length === 0) {
            node.appendChild(this.editor.createElement('li'));
        }
    }
}
