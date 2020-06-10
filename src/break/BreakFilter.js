import Filter from '../base/Filter.js';

/**
 * Filters break elements
 */
export default class BreakFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element.innerHTML = element.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (element instanceof HTMLParagraphElement) {
            element.outerHTML = element.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else {
            element.innerHTML = element.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }
}