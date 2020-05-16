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
        if (!node.querySelector(':scope > summary:first-child')) {
            node.insertAdjacentElement('afterbegin', this.editor.createElement('summary'));
        }

        if (node.childElementCount === 1) {
            node.appendChild(this.editor.createElement('p'));
        }
    }
}
