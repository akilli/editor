import Converter from '../editor/Converter.js';

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
        return this.editor.createText(element.textContent);
    }
}
