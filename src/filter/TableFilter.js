import Filter from './Filter.js';

/**
 * Filters empty tables and table sections
 */
export default class TableFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        ['tbody', 'thead', 'tfoot', 'tr'].forEach(item => parent.querySelectorAll(item).forEach(node => {
            if (!node.querySelector('th:not(:empty), td:not(:empty)')) {
                if (item === 'tbody') {
                    node.parentElement.parentElement.removeChild(node.parentElement);
                } else {
                    node.parentElement.removeChild(node);
                }
            }
        }));
    }
}
