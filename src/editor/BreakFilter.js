import Filter from './Filter.js';

/**
 * Trims br elements
 */
export default class BreakFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        let br;

        while ((br = parent.firstChild) && br instanceof HTMLBRElement || (br = parent.lastChild) && br instanceof HTMLBRElement) {
            parent.removeChild(br);
        }
    }
}
