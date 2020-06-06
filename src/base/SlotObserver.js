import Observer from './Observer.js';

/**
 * Slot Observer
 */
export default class SlotObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
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
        const call = (ev) => {
            ev.preventDefault();
            ev.cancelBubble = true;
        };
        node.addEventListener('keydown', call);
        node.addEventListener('keyup', call);
    }
}
