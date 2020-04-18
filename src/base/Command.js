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
     * Executes the command
     */
    execute() {
        this.dialog ? this.dialog.open(attributes => this.insert(attributes), this.selectedAttributes()) : this.insert();
    }

     /**
      * Insert element
      *
      * @param {Object.<String, String>} [attributes = {}]
      */
    insert(attributes = {}) {
        if (this.element) {
            this.editor.insert(this.element.create(attributes));
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

        if (sel instanceof HTMLElement && sel.tagName.toLowerCase() === this.element.tagName) {
            Array.from(sel.attributes).forEach(attribute => attributes[attribute.nodeName] = attribute.nodeValue);
        }

        return attributes;
    }
}
