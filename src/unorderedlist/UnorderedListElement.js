import Element from '../base/Element.js';

/**
 * Unordered List Element
 */
export default class UnorderedListElement extends Element {
    /**
     * Initializes a new unordered list element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'unorderedlist', 'ul');
    }

    /**
     * @inheritDoc
     */
    create(attributes = {}) {
        const list = this.editor.createElement('ul');
        list.appendChild(this.editor.createElement('li'));

        return list;
    }
}
