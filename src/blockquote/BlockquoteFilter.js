import Blockquote from './Blockquote.js';
import Filter from '../base/Filter.js';
import { Position, TagName } from '../base/enum.js';

/**
 * Filters blockquote figure
 */
export default class BlockquoteFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.localName === TagName.FIGURE
            && element.classList.contains(Blockquote.name)
            && element.querySelector(':scope > ' + TagName.BLOCKQUOTE)
            && !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            element.insertAdjacentElement(
                Position.BEFOREBEGIN,
                element.querySelector(':scope > ' + TagName.BLOCKQUOTE),
            );
            element.parentElement.removeChild(element);
        }
    }
}
