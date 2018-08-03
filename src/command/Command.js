import Editor from '../Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {?String} tagName
     */
    constructor(editor, tagName = null) {
        let tag = null;

        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
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
