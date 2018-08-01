import Editor from '../Editor.js';

/**
 * HTML Element Converter
 */
export default class Converter {
    /**
     * Initializes a new element converter and with given tag
     *
     * @param {Editor} editor
     * @param {?string} tag
     */
    constructor(editor, tag = null) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        }

        if (tag && !editor.getTag(tag)) {
            throw 'Invalid element';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * The new tag name of the converted element
         *
         * @type {?string}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * Converts an HTML element to another or to a text node
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement|Text}
     */
    convert(element) {
        throw 'Not implemented';
    }
}
