import Dialog from './Dialog.js';
import Editor from './Editor.js';
import Element from './Element.js';

/**
 * Command
 */
export default class Command {
    /**
     * Initializes a new editor command optionally with given element and dialog
     *
     * @param {Editor} editor
     * @param {?Element} [element = null]
     * @param {?Function} [dialog = null]
     */
    constructor(editor, element = null, dialog = null) {
        if (!(editor instanceof Editor) || element && !(element instanceof Element) || dialog && !(dialog instanceof Dialog.constructor)) {
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
