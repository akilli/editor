import Filter from '../base/Filter.js';
import {is} from '../base/util.js';

/**
 * Filters quote figure
 */
export default class QuoteFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && is(element, 'figure')
            && element.classList.contains('quote')
            && element.querySelector(':scope > blockquote')
            && !element.querySelector(':scope > figcaption')
        ) {
            element.insertAdjacentElement('beforebegin', element.querySelector(':scope > blockquote'));
            element.innerHTML = '';
        }
    }
}
