import Dialog from './Dialog.js';
import EditorObject from './EditorObject.js';
import Element from './Element.js';

/**
 * Command
 */
export default class Command extends EditorObject {
    /**
     * Initializes a new editor command optionally with given element and dialog
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {?Element} [element = null]
     */
    constructor(editor, name, element = null) {
        super(editor, name);

        if (element && !(element instanceof Element)) {
            throw 'Invalid argument';
        }

        /**
         * Element
         *
         * @type {?Element}
         * @readonly
         */
        this.element = element;

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
      * Insert
      *
      * @param {Object.<String, String>} [attributes = {}]
      */
    insert(attributes = {}) {
        if (this.element) {
            this.element.insert(attributes);
        }
    }

    /**
     * Returns old data for dialog
     *
     * @return {Object}
     */
    oldData() {
        const attributes = {};
        const sel = this.editor.getSelectedElement();

        if (sel instanceof HTMLElement && sel.tagName.toLowerCase() === this.element.name) {
            Array.from(sel.attributes).forEach(attribute => attributes[attribute.nodeName] = attribute.nodeValue);
        }

        return attributes;
    }
}
