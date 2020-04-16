import Editor from './Editor.js';
import Translator from './Translator.js';

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

        /**
         * Translator
         *
         * @type {Translator}
         */
        this.translator = this.editor.translators.get(this.name) || new Translator(this.name, {});
    }
}
