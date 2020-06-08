import Filter from '../base/Filter.js';

/**
 * Filters quote figure
 */
export default class QuoteFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.matches('figure[class=quote')
            && element.querySelector(':scope > blockquote')
            && !element.querySelector(':scope > figcaption')
        ) {
            element.insertAdjacentElement('beforebegin', element.querySelector(':scope > blockquote'));
            element.innerHTML = '';
        }
    }
}
