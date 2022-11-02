import Filter from '../base/Filter.js';
import TagName from '../base/TagName.js';

export default class FigureFilter extends Filter {
    /**
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        element
            .querySelectorAll(`${TagName.FIGURE} > ${TagName.FIGCAPTION}:only-child`)
            .forEach((item) => item.parentElement.removeChild(item));
    }
}
