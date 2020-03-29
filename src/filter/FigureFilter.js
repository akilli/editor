import Filter from '../editor/Filter.js';

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        parent.querySelectorAll('figure > figcaption:only-child').forEach(node => node.parentElement.removeChild(node));
    }
}
