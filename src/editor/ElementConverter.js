import Converter from './Converter.js';
import Editor from './Editor.js';

/**
 * HTML Element-to-Element Converter
 */
export default class ElementConverter extends Converter {
    /**
     * Initializes a new element converter and with given tag name
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} target
     */
    constructor(editor, name, target) {
        super(editor, name);

        if (!target || typeof target !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * The new tag name of the converted element
         *
         * @type {String}
         * @readonly
         */
        this.target = target;
    }

    /**
     * Converts an HTML element to another
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement}
     */
    convert(element) {
        const newElement = this.editor.createElement(this.target);
        newElement.innerHTML = element.innerHTML;

        return newElement;
    }
}
