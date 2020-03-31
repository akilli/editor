import Dialog from './Dialog.js';
import Editor from './Editor.js';

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
        this.dialog = dialog ? new dialog(this.editor, data => this.insert(data)) : null;
    }

    /**
     * Execute command
     */
    execute() {
        this.dialog ? this.dialog.open(this.oldData()) : this.insert();
    }

     /**
      * Insert
      *
      * @param {Object} [data = {}]
      */
    insert(data = {}) {
        if (this.tag && this.tag.group === 'text') {
            this.editor.formatText(this.editor.createElement(this.tag.name));
        } else if (this.tag) {
            this.editor.insert(this.editor.createElement(this.tag.name));
        }
    }

    /**
     * Returns old data for dialog
     *
     * @return {Object}
     */
    oldData() {
        return {};
    }
}
