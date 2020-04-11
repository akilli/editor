import Filter from './Filter.js';

/**
 * Trims br elements
 */
export default class BreakFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        parent.innerHTML = parent.innerHTML.replace(/^\s*(<br\ ?\/?>\s*)+/gi, '').replace(/\s*(<br\ ?\/?>\s*)+$/gi, '');

        if (parent instanceof HTMLParagraphElement) {
            parent.outerHTML = parent.outerHTML.replace(/\s*(<br\ ?\/?>\s*)+/gi, '</p><p>');
        } else{
            parent.innerHTML = parent.innerHTML.replace(/\s*(<br\ ?\/?>\s*)+/gi, '<br>');
        }
    }
}
