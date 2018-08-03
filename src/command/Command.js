import Editor from '../Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command with given name and tag name
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {?String} tagName
     */
    constructor(editor, name, tagName = null) {
        let tag = null;

        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        } else if (!name || typeof name !== 'string') {
            throw 'Invalid command name';
        } else if (tagName && !(tag = editor.getTag(tagName))) {
            throw 'Invalid heading element';
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

        /**
         * Tag
         *
         * @type {?Tag}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * Execute command
     */
    execute() {
        throw 'Not implemented';
    }
}
