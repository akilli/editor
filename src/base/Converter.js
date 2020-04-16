import EditorObject from './EditorObject.js';

/**
 * HTML Element Converter
 */
export default class Converter extends EditorObject {
    /**
     * Initializes a new element converter and with given tag name and target name
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
        return this.editor.createElement(this.target, {}, element.innerHTML);
    }
}
