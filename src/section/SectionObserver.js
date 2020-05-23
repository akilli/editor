import Observer from '../base/Observer.js';

/**
 * Handles section elements
 */
export default class SectionObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'section') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('section').forEach(section => this.init(section));
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
