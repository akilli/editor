import Filter from '../base/Filter.js';
import TagName from '../base/TagName.js';

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element
            .querySelectorAll(`${TagName.FIGURE} > ${TagName.FIGCAPTION}:only-child`)
            .forEach((item) => item.parentElement.removeChild(item));
    }
}
