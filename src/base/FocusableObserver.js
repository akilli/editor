import Observer from './Observer.js';

/**
 * Focusable Observer
 */
export default class FocusableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.hasAttribute('data-focusable')) {
                node.focus();
            }
        }));
    }
}
