import Observer from '../base/Observer.js';

/**
 * Handles orderedlist elements
 */
export default class OrderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => {
            item.addedNodes.forEach(node => {
                if (node instanceof HTMLOListElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('ol').forEach(ol => this.init(ol));
                }
            });

            if (item.removedNodes.length > 0 && item.target instanceof HTMLOListElement && item.target.children.length === 0) {
                item.target.parentElement.removeChild(item.target);
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
