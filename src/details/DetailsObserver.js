import Observer from '../base/Observer.js';

/**
 * Handles details elements
 */
export default class DetailsObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLDetailsElement) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('details').forEach(details => this.init(details));
            }
        }));
    }

    /**
     * Initializes details element
     *
     * @private
     * @param {HTMLDetailsElement} node
     */
    init(node) {
        node.querySelectorAll(':scope > summary:not(:first-child)').forEach(summary => node.removeChild(summary));

        if (!node.querySelector(':scope > summary:first-child')) {
            node.insertAdjacentElement('afterbegin', this.editor.createElement('summary'));
        }

        if (!node.querySelector(':scope > slot')) {
            node.appendChild(this.editor.createElement('slot'));
        }
    }
}
