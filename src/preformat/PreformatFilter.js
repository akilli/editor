import Filter from '../base/Filter.js';

/**
 * Filters preformatted text figure
 */
export default class PreformatFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.localName === 'figure'
            && element.classList.contains('preformat')
            && element.querySelector(':scope > pre')
            && !element.querySelector(':scope > figcaption')
        ) {
            element.insertAdjacentElement('beforebegin', element.querySelector(':scope > pre'));
            element.innerHTML = '';
        }
    }
}
