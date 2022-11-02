import Blockquote from './Blockquote.js';
import Filter from '../base/Filter.js';
import TagName from '../base/TagName.js';

export default class BlockquoteFilter extends Filter {
    /**
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        if (
            element instanceof HTMLElement &&
            element.localName === TagName.FIGURE &&
            element.classList.contains(Blockquote.name) &&
            element.querySelector(':scope > ' + TagName.BLOCKQUOTE) &&
            !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            this.editor.dom.insertBefore(element.querySelector(':scope > ' + TagName.BLOCKQUOTE), element);
            element.parentElement.removeChild(element);
        }
    }
}
