import Converter from './Converter.js';

/**
 * HTML Element-to-Element Converter
 */
export default class ElementConverter extends Converter {
    /**
     * Initializes a new element converter and with given tag
     *
     * @param {String} tag
     */
    constructor(tag) {
        super();

        if (!tag) {
            throw 'Missing replacement tag';
        }

        /**
         * The new tag name of the converted element
         *
         * @type {String}
         * @readonly
         */
        this.tag = tag;
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

        const newElement = element.ownerDocument.createElement(this.tag);
        newElement.innerHTML = element.innerHTML;

        return newElement;
    }
}
