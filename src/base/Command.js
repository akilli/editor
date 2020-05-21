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
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         */
        this.name = name;

        /**
         * Name of the tag to insert
         *
         * @type {?String}
         */
        this.tagName = tagName ? tagName.toLowerCase() : null;

        /**
         * Tag configuration
         *
         * @type {?Tag}
         */
        this.tag = this.editor.tags.get(this.tagName) || null;

        /**
         * Dialog
         *
         * @type {?Dialog}
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
      * @protected
      * @param {Object.<String, String>} [attributes = {}]
      */
    insert(attributes = {}) {
        if (this.tagName && this.tag) {
            Object.keys(attributes).forEach(item => this.tag.attributes.includes(item) || delete attributes[item]);
            const element = this.editor.createElement(this.tagName, {attributes: attributes});
            this.tag.group === 'format' ? this.editor.format(element) : this.editor.insert(element);
        }
    }

    /**
     * Returns attributes from selected element if it is the same kind of element
     *
     * @protected
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
