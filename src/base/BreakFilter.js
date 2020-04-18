import Filter from './Filter.js';

/**
 * Filters linebreaks
 */
export default class BreakFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent) {
        parent.innerHTML = parent.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (parent instanceof HTMLParagraphElement) {
            parent.outerHTML = parent.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else{
            parent.innerHTML = parent.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }
}
