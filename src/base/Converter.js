import Editor from './Editor.js';

/**
 * HTML Element Converter
 */
export default class Converter {
    /**
     * Initializes a new element converter and with given tag name and target name
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} target
     */
    constructor(editor, name, target) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string' || !target || typeof target !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         * @readonly
         */
        this.name = name;

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
        return this.editor.createElement(this.target, {}, element.innerHTML);
    }
}
