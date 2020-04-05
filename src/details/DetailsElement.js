import Element from '../editor/Element.js';

/**
 * Details Element
 */
export default class DetailsElement extends Element {
    /**
     * Initializes a new details element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details', 'details');
    }

    /**
     * @inheritDoc
     */
    create(attributes = {}) {
        const details = this.editor.createElement('details');
        details.appendChild(this.editor.createElement('summary'));
        details.appendChild(this.editor.createElement('p'));

        return details;
    }
}
