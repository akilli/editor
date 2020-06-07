import Observer from './Observer.js';

/**
 * Deletable Observer
 */
export default class DeletableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.hasAttribute('data-deletable')) {
                    this.init(node);
                }

                node.querySelectorAll('[data-deletable]').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes deletable element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.addEventListener('keydown', this);
    }

    /**
     * Handles key combinations for delete
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (event.target === event.currentTarget && this.editor.isKey(event, 'Delete', {ctrl: true})) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this.editor.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
