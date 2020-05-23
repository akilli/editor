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
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'figure' && node.classList.contains('gallery')) {
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
            node.insertAdjacentElement('afterbegin', this.editor.createElement('slot'));
        }
    }
}
