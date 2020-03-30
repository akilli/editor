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
     * @param {String} tagName
     */
    constructor(editor, tagName) {
        super(editor);

        const tag = editor.getTag(tagName);

        if (!tag) {
            throw 'Invalid argument';
        }

        /**
         * The new tag of the converted element
         *
         * @type {?Tag}
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
        const newElement = this.editor.createElement(this.tag.name);
        newElement.innerHTML = element.innerHTML;

        return newElement;
    }
}
