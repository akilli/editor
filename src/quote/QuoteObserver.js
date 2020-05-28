import Observer from '../base/Observer.js';

/**
 * Handles quote elements
 */
export default class QuoteObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.removedNodes.forEach(node => {
            if (node instanceof HTMLElement
                && node.tagName.toLowerCase() === 'blockquote'
                && item.target.tagName.toLowerCase() === 'figure'
                && item.target.classList.contains('quote')
            ) {
                item.target.parentElement.removeChild(item.target);
            }
        }));
    }
}
