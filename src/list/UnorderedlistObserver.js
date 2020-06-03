import Observer from '../base/Observer.js';

/**
 * Handles unorderedlist elements
 */
export default class UnorderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof HTMLUListElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('ul').forEach(item => this.init(item));
                }
            });

            if (record.removedNodes.length > 0 && record.target instanceof HTMLUListElement && record.target.children.length === 0) {
                record.target.parentElement.removeChild(record.target);
            }
        });
    }

    /**
     * Initializes orderedlist element
     *
     * @private
     * @param {HTMLUListElement} node
     */
    init(node) {
        if (node.children.length === 0) {
            node.appendChild(this.editor.createElement('li'));
        }
    }
}
