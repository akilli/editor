import Converter from './Converter.js';

/**
 * HTML Element-to-Element Converter
 */
export default class ElementConverter extends Converter {
    /**
     * @inheritDoc
     */
    constructor(editor, tag) {
        super(editor, tag);

        if (!this.tag) {
            throw 'Invalid element';
        }
    }

    /**
     * Converts an HTML element to another
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement}
     */
    convert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid element';
        }

        const newElement = this.editor.document.createElement(this.tag);
        newElement.innerHTML = element.innerHTML;

        return newElement;
    }
}
