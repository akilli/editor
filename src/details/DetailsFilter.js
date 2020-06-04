import Filter from '../base/Filter.js';

/**
 * Filters out details elements with summary elements as only child
 */
export default class DetailsFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll('details > summary:only-child').forEach(item => item.parentElement.removeChild(item));
    }
}
