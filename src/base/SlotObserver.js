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
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('slot').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes slot element
     *
     * @private
     * @param {HTMLSlotElement} node
     */
    init(node) {
        node.addEventListener('keydown', this);
    }

    /**
     * Disables all keyboard events
     *
     * @private
     * @param {KeyboardEvent} event
     */
    keydown(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
