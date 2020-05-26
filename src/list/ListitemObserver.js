import Observer from '../base/Observer.js';

/**
 * Handles listitem elements
 */
export default class ListitemObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.removedNodes.forEach(node => {
            if (node instanceof HTMLLIElement && item.target.children.length <= 0) {
                item.target.parentElement.removeChild(item.target);
            }
        }));
    }
}
