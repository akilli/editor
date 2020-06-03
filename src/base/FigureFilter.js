import Filter from './Filter.js';

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
    /**
     * Initializes a new figure filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'figure');
    }

    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll('figure > figcaption:only-child').forEach(item => item.parentElement.removeChild(item));
    }
}
