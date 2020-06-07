import Observer from '../base/Observer.js';

/**
 * Handles gallery elements
 */
export default class GalleryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.localName === 'figure' && node.classList.contains('gallery')) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('figure.gallery').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes gallery element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > slot')) {
            const slot = this.editor.createElement('slot');
            const caption = node.querySelector(':scope > figcaption');
            caption ? caption.insertAdjacentElement('beforebegin', slot) : node.appendChild(slot);
        }
    }
}
