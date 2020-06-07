import Observer from '../base/Observer.js';

/**
 * Handles quote elements
 */
export default class QuoteObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.removedNodes.forEach(node => {
            if (node instanceof HTMLElement
                && node.localName === 'blockquote'
                && record.target.localName === 'figure'
                && record.target.classList.contains('quote')
            ) {
                record.target.parentElement.removeChild(record.target);
            }
        }));
    }
}
