import Editor from '../Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command
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
     * Execute command
     */
    execute() {
        throw 'Not implemented';
    }
}
