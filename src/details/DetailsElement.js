import Element from '../editor/Element.js';

/**
 * Details Element
 */
export default class DetailsElement extends Element {
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
