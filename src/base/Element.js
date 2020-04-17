import Editor from './Editor.js';

/**
 * Element
 */
export default class Element {
    /**
     * Initializes a new editor element
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} tagName
     */
    constructor(editor, name, tagName) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string' || !tagName || typeof tagName !== 'string') {
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
         * Tag name
         *
         * @type {String}
         * @readonly
         */
        this.tagName = tagName;
    }

    /**
     * Creates element
     *
     * @param {Object.<String, String>} [attributes = {}]
     *
     * @return {HTMLElement}
     */
    create(attributes = {}) {
        return this.editor.createElement(this.tagName, attributes);
    }

    /**
     * Inserts element
     *
     * @param {Object.<String, String>} [attributes = {}]
     */
    insert(attributes = {}) {
        this.editor.insert(this.create(attributes));
    }
}
