import Observer from '../base/Observer.js';

/**
 * Handles orderedlist elements
 */
export default class OrderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => {
            if (item.removedNodes.length > 0 && item.target instanceof HTMLOListElement && item.target.children.length === 0) {
                item.target.parentElement.removeChild(item.target);
            }
        });
    }
}
