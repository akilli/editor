import Dialog from '../dialog/Dialog.js';
import Editor from '../Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {?String} [tagName = null]
     * @param {?Function} [dialog = null]
     */
    constructor(editor, tagName = null, dialog = null) {
        let tag;

        if (!(editor instanceof Editor) || tagName && !(tag = editor.getTag(tagName)) || dialog && !(dialog instanceof Dialog.constructor)) {
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
         * Tag
         *
         * @type {?Tag}
         * @readonly
         */
        this.tag = tag;

        /**
         * Dialog
         *
         * @type {?Dialog}
         * @readonly
         */
        this.dialog = dialog ? new dialog(this.editor, this.insert) : null;
    }

    /**
     * Execute command
     */
    execute() {
        this.dialog ? this.dialog.open() : this.insert();
    }

     /**
      * Insert
      *
      * @param {Object} [data = {}]
      */
    insert(data = {}) {
        throw 'Not implemented';
    }
}
