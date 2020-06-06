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
        node.addEventListener('keydown', ev => {
            if (ev.target === node && this.editor.isKey(ev, 'Delete', {ctrl: true})) {
                if (node.previousElementSibling instanceof HTMLElement) {
                    this.editor.focusEnd(node.previousElementSibling);
                }

                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
