import Converter from './Converter.js';

/**
 * HTML Element-to-Element Converter
 */
export default class ElementConverter extends Converter {
    /**
     * Initializes a new element converter and with given tag name
     *
     * @param {String} name
     */
    constructor(name) {
        super();

        if (!name) {
            throw 'Missing replacement tag';
        }

        /**
         * The new tag name of the converted element
         *
         * @type {String}
         * @readonly
         */
        this.name = name;
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
            throw 'No HTML element';
        }

        const newElement = element.ownerDocument.createElement(this.name);
        newElement.innerHTML = element.innerHTML;

        return newElement;
    }
}
