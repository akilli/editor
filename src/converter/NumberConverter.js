import Converter from './Converter.js';

/**
 * Mapping
 *
 * @type {Object}
 */
const map = {
    sub: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
    sup: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
};

/**
 * HTML Subscript and Superscript Element-to-Text Converter
 */
export default class NumberConverter extends Converter {
    /**
     * Converts a subscript/superscript element to a text node and numbers with their corresponding Unicode characters
     *
     * @param {HTMLElement} element
     *
     * @return {Text}
     */
    convert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid element';
        }

        const tag = element.tagName.toLowerCase();
        let text = element.innerText.trim();

        if (map.hasOwnProperty(tag) && !isNaN(text)) {
            text = text.replace(/[0-9]/g, n => map[tag][n]);
        }

        return element.ownerDocument.createTextNode(text);
    }
}
