import Editor from './Editor.js';

/**
 * Element
 */
export default class Element {
    /**
     * Initializes a new editor element
     *
     * @param {Editor} editor
     * @param {?String} [name = null]
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor)) {
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
         * @type {?String}
         * @readonly
         */
        this.name = name && typeof name === 'string' ? name : null;
    }

    /**
     * Creates element
     *
     * @param {Object.<String, String>} [attributes = {}]
     *
     * @return {HTMLElement}
     */
    create(attributes = {}) {
        if (!this.name) {
            throw 'No element name';
        }

        return this.editor.createElement(this.name, attributes);
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
