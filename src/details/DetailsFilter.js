import Filter from '../base/Filter.js';

/**
 * Filters out details elements with summary elements as only child
 */
export default class DetailsFilter extends Filter {
    /**
     * Initializes a new details filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details');
    }

    /**
     * @inheritDoc
     */
    filter(element) {
        element.querySelectorAll('details > summary:only-child').forEach(node => node.parentElement.removeChild(node));
    }
}
