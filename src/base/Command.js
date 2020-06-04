import Editor from './Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Editor
     *
     * @type {Editor}
     */
    editor;

    /**
     * Name
     *
     * @type {String}
     */
    name;

    /**
     * Name of the tag to insert
     *
     * @type {?String}
     */
    tagName = null;

    /**
     * Associated tag
     *
     * @return {?Tag}
     */
    get tag() {
        return this.tagName ? this.editor.tags.get(this.tagName) : null;
    }

    /**
     * Associated dialog
     *
     * @return {?Dialog}
     */
    get dialog() {
        return this.editor.dialogs.get(this.name);
    }

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

        this.editor = editor;
        this.name = name;
        this.tagName = tagName;
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
        if (this.tag) {
            Object.keys(attributes).forEach(item => this.tag.attributes.includes(item) || delete attributes[item]);
            const element = this.editor.createElement(this.tag.name, {attributes: attributes});
            this.tag.isFormat() ? this.editor.format(element) : this.editor.insert(element);
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

        if (sel instanceof HTMLElement && sel.localName === this.tagName) {
            Array.from(sel.attributes).forEach(attribute => attributes[attribute.nodeName] = attribute.nodeValue);
        }

        return attributes;
    }
}
