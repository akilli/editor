import Converter from './Converter.js';

/**
 * Mapping
 *
 * @type {String[]}
 */
const map = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

/**
 * HTML Superscript Element-to-Text Converter
 */
export default class SuperscriptConverter extends Converter {
    /**
     * Converts a superscript element to a text node and replaces numbers-only text to Unicode characters
     *
     * @param {HTMLElement} element
     *
     * @return {Text}
     */
    convert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid element';
        }

        let text = element.innerText.trim();

        if (!isNaN(text)) {
            text = text.replace(/[0-9]/g, n => map[n]);
        }

        return element.ownerDocument.createTextNode(text);
    }
}
