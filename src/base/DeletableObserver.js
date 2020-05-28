import Observer from './Observer.js';

/**
 * Deletable Observer
 */
export default class DeletableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        const names = this.editor.tags.deletable();
        const selector = names.join(', ');

        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && names.includes(node.tagName.toLowerCase())) {
                this.keyboard(node);
            } else if (node instanceof HTMLElement && selector) {
                node.querySelectorAll(selector).forEach(item => this.keyboard(item))
            }
        }));
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (ev.target === node && ev.ctrlKey && ev.key === 'Delete') {
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
