import Observer from '../base/Observer.js';

/**
 * Handles unorderedlist elements
 */
export default class UnorderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => {
            item.addedNodes.forEach(node => {
                if (node instanceof HTMLUListElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('ul').forEach(ul => this.init(ul));
                }
            });

            if (item.removedNodes.length > 0 && item.target instanceof HTMLUListElement && item.target.children.length === 0) {
                item.target.parentElement.removeChild(item.target);
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
