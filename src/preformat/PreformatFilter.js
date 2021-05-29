import Filter from '../base/Filter.js';
import Preformat from './Preformat.js';
import { Position, TagName } from '../base/enum.js';

/**
 * Filters preformatted text figure
 */
export default class PreformatFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.localName === TagName.FIGURE
            && element.classList.contains(Preformat.name)
            && element.querySelector(':scope > ' + TagName.PRE)
            && !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            element.insertAdjacentElement(Position.BEFOREBEGIN, element.querySelector(':scope > ' + TagName.PRE));
            element.parentElement.removeChild(element);
        }
    }
}
