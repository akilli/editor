import Filter from '../base/Filter.js';

/**
 * Filters block quote figure
 */
export default class BlockQuoteFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.localName === 'figure'
            && element.classList.contains('quote')
            && element.querySelector(':scope > blockquote')
            && !element.querySelector(':scope > figcaption')
        ) {
            element.insertAdjacentElement('beforebegin', element.querySelector(':scope > blockquote'));
            element.innerHTML = '';
        }
    }
}
