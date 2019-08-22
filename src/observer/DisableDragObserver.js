import Observer from './Observer.js';

/**
 * Disable dragging of anchor and image elements
 */
export default class DisableDragObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLAnchorElement || node instanceof HTMLImageElement) {
                node.draggable = false;
                node.addEventListener('dragstart', ev => ev.preventDefault());
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('img, a').forEach(item => {
                    item.draggable = false;
                    item.addEventListener('dragstart', ev => ev.preventDefault());
                });
            }
        }));
    }
}
