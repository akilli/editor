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
            if (node instanceof HTMLElement) {
                if (names.includes(node.tagName.toLowerCase())) {
                    this.keyboard(node);
                }

                node.querySelectorAll(selector).forEach(item => this.keyboard(item));
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
                if (node.previousElementSibling) {
                    this.editor.focusEnd(node.previousElementSibling);
                }

                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
