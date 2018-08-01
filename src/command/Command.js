import Editor from '../Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command with given name
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        }

        if (!name || typeof name !== 'string') {
            throw 'Invalid command name';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Command name
         *
         * @type {String}
         * @readonly
         */
        this.name = name;
    }

    /**
     * Execute command
     */
    execute() {
        throw 'Not implemented';
    }
}
