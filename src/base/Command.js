import Editor from './Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {?String} tagName
     */
    constructor(editor, name, tagName = null) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string' || tagName && typeof tagName !== 'string') {
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
         * Name of the tag to insert
         *
         * @type {?String}
         * @readonly
         */
        this.tagName = tagName ? tagName.toLowerCase() : null;

        /**
         * Dialog
         *
         * @type {?Dialog}
         * @readonly
         */
        this.dialog = this.editor.dialogs.get(this.name) || null;
    }

    /**
     * Executes the command
     */
    execute() {
        this.dialog ? this.dialog.open(attributes => this.insert(attributes), this.selectedAttributes()) : this.insert();
    }

     /**
      * Inserts element
      *
      * @param {Object.<String, String>} [attributes = {}]
      */
    insert(attributes = {}) {
        if (this.tagName) {
            this.editor.insert(this.editor.createElement(this.tagName, {attributes: attributes}));
        }
    }

    /**
     * Returns attributes from selected element if it is the same kind of element
     *
     * @return {Object}
     */
    selectedAttributes() {
        const attributes = {};
        const sel = this.editor.getSelectedElement();

        if (sel instanceof HTMLElement && sel.tagName.toLowerCase() === this.tagName) {
            Array.from(sel.attributes).forEach(attribute => attributes[attribute.nodeName] = attribute.nodeValue);
        }

        return attributes;
    }
}
