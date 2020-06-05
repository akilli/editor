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
        this.dialog ? this.openDialog() : this.insert(this.selectedAttributes());
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
            this.tag.group === 'format' ? this.editor.format(element) : this.editor.insert(element);
        }
    }

    /**
     * Open dialog
     *
     * @protected
     */
    openDialog() {
        this.dialog.open(attributes => this.insert(attributes), this.selectedAttributes())
    }

    /**
     * Returns selected element if it is the same kind of element
     *
     * @protected
     * @return {?HTMLElement}
     */
    selectedElement() {
        const element = this.editor.getSelectedElement();

        return element && element.localName === this.tagName ? element : null;
    }

    /**
     * Returns attributes from selected element if it is the same kind of element
     *
     * @protected
     * @return {Object.<String, String>}
     */
    selectedAttributes() {
        const element = this.selectedElement();
        const attributes = {};

        if (element && this.tag) {
            Array.from(element.attributes).forEach(item => {
                if (this.tag.attributes.includes(item.nodeName)) {
                    attributes[item.nodeName] = item.nodeValue;
                }
            });
        }

        return attributes;
    }
}
