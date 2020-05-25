import Observer from '../base/Observer.js';

/**
 * Handles list elements
 */
export default class ListObserver extends Observer {
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
