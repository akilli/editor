import Filter from './Filter.js';

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll('figure > figcaption:only-child').forEach(node => node.parentElement.removeChild(node));
    }
}
