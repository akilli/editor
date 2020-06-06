import Observer from '../base/Observer.js';

/**
 * Figure observer to create missing figcaption elements
 */
export default class FigureObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.localName === 'figure') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('figure').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes figure element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > figcaption')) {
            node.appendChild(this.editor.createElement('figcaption'));
        }
    }
}
