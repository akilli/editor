import Filter from '../base/Filter.js';
import { TagName } from '../base/enum.js';

/**
 * Filters out details elements with summary elements as only child
 */
export default class DetailsFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll(`${TagName.SUMMARY}:not(:first-child)`).forEach(
            item => item.parentElement.removeChild(item),
        );
        element.querySelectorAll(`${TagName.SUMMARY}:only-child`).forEach(item => item.parentElement.removeChild(item));
    }
}
