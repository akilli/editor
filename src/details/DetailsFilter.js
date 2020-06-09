import Filter from '../base/Filter.js';

/**
 * Filters out details elements with summary elements as only child
 */
export default class DetailsFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll('summary:not(:first-child)').forEach(item => item.parentElement.removeChild(item));
        element.querySelectorAll('summary:only-child').forEach(item => item.parentElement.removeChild(item));
    }
}
