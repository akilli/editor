import Editor from './Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command optionally with given element and dialog
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
         * Element
         *
         * @type {?Element}
         * @readonly
         */
        this.element = this.editor.elements.get(this.name) || null;

        /**
         * Dialog
         *
         * @type {?Dialog}
         * @readonly
         */
        this.dialog = this.editor.dialogs.get(this.name) || null;
    }

    /**
     * Execute command
     */
    execute() {
        this.dialog ? this.dialog.open(data => this.insert(data), this.oldData()) : this.insert();
    }

     /**
      * Insert element
      *
      * @param {Object.<String, String>} [data = {}]
      */
    insert(data = {}) {
        if (this.element) {
            this.element.insert(data);
        }
    }

    /**
     * Returns old data for dialog
     *
     * @return {Object}
     */
    oldData() {
        const data = {};
        const sel = this.editor.getSelectedElement();

        if (sel instanceof HTMLElement && sel.tagName.toLowerCase() === this.element.tagName) {
            Array.from(sel.attributes).forEach(attribute => data[attribute.nodeName] = attribute.nodeValue);
        }

        return data;
    }
}
