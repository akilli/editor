import Observer from './Observer.js';

/**
 * Slot Observer
 */
export default class SlotObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLSlotElement) {
                this.keyboard(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('slot').forEach(item => this.keyboard(item));
            }
        }));
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLSlotElement} node
     */
    keyboard(node) {
        node.addEventListener('keydown', ev => {
            ev.preventDefault();
            ev.stopPropagation();
        });
    }
}
