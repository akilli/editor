import Filter from '../base/Filter.js';
import TagName from '../base/TagName.js';

export default class DetailsFilter extends Filter {
    /**
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        element
            .querySelectorAll(`${TagName.SUMMARY}:not(:first-child)`)
            .forEach((item) => item.parentElement.removeChild(item));
        element
            .querySelectorAll(`${TagName.SUMMARY}:only-child`)
            .forEach((item) => item.parentElement.removeChild(item));
    }
}
