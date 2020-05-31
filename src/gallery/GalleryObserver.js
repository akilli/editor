import Observer from '../base/Observer.js';

/**
 * Handles gallery elements
 */
export default class GalleryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.localName === 'figure' && node.classList.contains('gallery')) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('figure.gallery').forEach(gallery => this.init(gallery));
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
