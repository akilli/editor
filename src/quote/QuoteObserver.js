import Observer from '../base/Observer.js';

/**
 * Handles quote elements
 */
export default class QuoteObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.localName === 'blockquote') {
                    this.init(node);
                }

                node.querySelectorAll('blockquote').forEach(item => this.init(item));
            }
        }));

        records.forEach(record => record.removedNodes.forEach(node => {
            if (node instanceof HTMLElement
                && node.localName === 'blockquote'
                && record.target instanceof HTMLElement
                && record.target.localName === 'figure'
                && record.target.classList.contains('quote')
            ) {
                record.target.parentElement.removeChild(record.target);
            }
        }));
    }

    /**
     * Initializes blockquote element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!(node.parentElement instanceof HTMLElement) || node.parentElement.localName !== 'figure') {
            const figure = this.editor.createElement('figure', {attributes: {class: 'quote'}});
            node.insertAdjacentElement('beforebegin', figure);
            figure.insertAdjacentElement('afterbegin', node);
        }
    }
}
