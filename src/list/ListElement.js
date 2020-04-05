import Element from '../editor/Element.js';

/**
 * List Element
 */
export default class ListElement extends Element {
    /**
     * @inheritDoc
     */
    create(attributes = {}) {
        const list = this.editor.createElement(this.tagName);
        list.appendChild(this.editor.createElement('li'));

        return list;
    }
}
