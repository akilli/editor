import Observer from './Observer.js';

/**
 * Deletable Observer
 */
export default class DeletableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.hasAttribute('data-deletable')) {
                    this.keyboard(node);
                }

                node.querySelectorAll('[data-deletable]').forEach(item => this.keyboard(item));
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
            if (ev.target === node && !ev.altKey && ev.ctrlKey && !ev.shiftKey && ev.key === 'Delete') {
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
