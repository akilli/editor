import Element from '../base/Element.js';

/**
 * Ordered List Element
 */
export default class OrderedListElement extends Element {
    /**
     * Initializes a new ordered list element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'orderedlist', 'ol');
    }

    /**
     * @inheritDoc
     */
    create(attributes = {}) {
        const list = this.editor.createElement('ol');
        list.appendChild(this.editor.createElement('li'));

        return list;
    }
}
