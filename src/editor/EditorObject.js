import Editor from './Editor.js';

/**
 * Editor Object
 */
export default class EditorObject {
    /**
     * Initializes a new editor object with given name
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string') {
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
    }

    /**
     * Translates given string
     *
     * @param {String} key
     *
     * @return {String}
     */
    t(key) {
        return this.editor.t(key);
    }
}
