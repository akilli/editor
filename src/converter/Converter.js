import Editor from '../Editor.js';

/**
 * HTML Element Converter
 */
export default class Converter {
    /**
     * Initializes a new editor converter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;
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
