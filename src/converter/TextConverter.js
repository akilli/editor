import Converter from './Converter.js';

/**
 * HTML Element-to-Text Converter
 */
export default class TextConverter extends Converter {
    /**
     * Converts an HTML element to a text node
     *
     * @param {HTMLElement} element
     *
     * @return {Text}
     */
    convert(element) {
        return element.ownerDocument.createTextNode(element.textContent);
    }
}
