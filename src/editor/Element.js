import EditorObject from './EditorObject.js';

/**
 * Element
 */
export default class Element extends EditorObject {
    /**
     * Initializes a new editor element
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} tagName
     */
    constructor(editor, name, tagName) {
        super(editor, name);

        if (!tagName || typeof tagName !== 'string') {
            throw 'Invalid argument';
        }

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
