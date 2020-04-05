import Filter from './Filter.js';

/**
 * Trims br elements
 */
export default class BreakFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        parent.querySelectorAll(':scope > br').forEach(node => {
            if (parent.firstChild.isSameNode(node) || node.previousSibling instanceof HTMLBRElement || parent.lastChild.isSameNode(node)) {
                parent.removeChild(node);
            }
        });

        if (parent.lastChild instanceof HTMLBRElement) {
            parent.removeChild(parent.lastChild);
        }
    }
}
