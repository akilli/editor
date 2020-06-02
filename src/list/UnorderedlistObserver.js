import Observer from '../base/Observer.js';

/**
 * Handles unorderedlist elements
 */
export default class UnorderedlistObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => {
            if (item.removedNodes.length > 0 && item.target instanceof HTMLUListElement && item.target.children.length === 0) {
                item.target.parentElement.removeChild(item.target);
            }
        });
    }
}
