import Observer from '../base/Observer.js';

/**
 * Handles div elements
 */
export default class DivObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLDivElement) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('div').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes div element
     *
     * @private
     * @param {HTMLDivElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > slot')) {
            node.appendChild(this.editor.createElement('slot'));
        }
    }
}
