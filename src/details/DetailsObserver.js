import Observer from '../base/Observer.js';

/**
 * Handles details elements
 */
export default class DetailsObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLDetailsElement) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('details').forEach(item => this.init(item));
                const details = node.closest('details');

                if (details && this.editor.content.contains(details)) {
                    details.open = true;
                }
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
        node.open = true;
        node.querySelectorAll(':scope > summary:not(:first-child)').forEach(item => node.removeChild(item));

        if (!node.querySelector(':scope > summary:first-child')) {
            node.insertAdjacentElement('afterbegin', this.editor.createElement('summary'));
        }

        if (!node.querySelector(':scope > slot')) {
            node.appendChild(this.editor.createElement('slot'));
        }
    }
}
