import Observer from '../base/Observer.js';

/**
 * Handles section elements
 */
export default class SectionObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.localName === 'section') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('section').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes section element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > slot')) {
            node.appendChild(this.editor.createElement('slot'));
        }
    }
}
