import Filter from '../base/Filter.js';

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent) {
        parent.querySelectorAll('figure > figcaption:only-child').forEach(node => node.parentElement.removeChild(node));
    }
}
