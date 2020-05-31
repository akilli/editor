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
                && node.localName === 'blockquote'
                && item.target.localName === 'figure'
                && item.target.classList.contains('quote')
            ) {
                item.target.parentElement.removeChild(item.target);
            }
        }));
    }
}
