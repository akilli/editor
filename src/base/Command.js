import Editor from './Editor.js';
import {is} from './util.js';

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
     * Associated tag
     *
     * @type {?Tag}
     */
    tag = null;

    /**
     * Associated dialog
     *
     * @type {?Dialog}
     */
    dialog = null;

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
        this.tag = tagName ? this.editor.tags.get(tagName) : null;
        this.dialog = this.editor.dialogs.get(name);
    }

    /**
     * Executes the command
     */
    execute() {
        this.dialog ? this._openDialog() : this._insert(this._selectedAttributes());
    }

     /**
      * Inserts element
      *
      * @protected
      * @param {Object.<String, String>} [attributes = {}]
      */
    _insert(attributes = {}) {
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
    _openDialog() {
        this.dialog.open(attributes => this._insert(attributes), this._selectedAttributes())
    }

    /**
     * Returns selected element if it is the same kind of element
     *
     * @protected
     * @return {?HTMLElement}
     */
    _selectedElement() {
        const element = this.editor.getSelectedElement();

        return is(element, this.tag?.name) ? element : null;
    }

    /**
     * Returns attributes from selected element if it is the same kind of element
     *
     * @protected
     * @return {Object.<String, String>}
     */
    _selectedAttributes() {
        const element = this._selectedElement();
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
