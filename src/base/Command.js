import Editor from './Editor.js';

/**
 * Command
 */
export default class Command {
    /**
     * Editor
     *
     * @protected
     * @type {Editor}
     */
    _editor;

    /**
     * Name
     *
     * @type {String}
     */
    name;

    /**
     * Associated tag
     *
     * @protected
     * @type {?Tag}
     */
    _tag = null;

    /**
     * Associated dialog
     *
     * @protected
     * @type {?Dialog}
     */
    _dialog = null;

    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {?String} [tagName = null]
     */
    constructor(editor, name, tagName = null) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string' || tagName && typeof tagName !== 'string') {
            throw 'Invalid argument';
        }

        this._editor = editor;
        this.name = name;
        this._tag = tagName ? this._editor.tags.get(tagName) : null;
        this._dialog = this._editor.dialogs.get(name);
    }

    /**
     * Executes the command
     */
    execute() {
        this._dialog ? this._openDialog() : this._insert(this._selectedAttributes());
    }

     /**
      * Inserts element
      *
      * @protected
      * @param {Object.<String, String>} [attributes = {}]
      */
    _insert(attributes = {}) {
        if (this._tag) {
            Object.keys(attributes).forEach(item => this._tag.attributes.includes(item) && attributes[item] || delete attributes[item]);
            const selected = this._selectedElement();

            if (this._tag.group !== 'format') {
                this._editor.insert(this._editor.createElement(this._tag.name, {attributes: attributes}));
            } else if (selected && Object.keys(attributes).length > 0) {
                selected.parentElement.replaceChild(
                    this._editor.createElement(this._tag.name, {attributes: attributes, html: selected.textContent}),
                    selected
                );
            } else if (selected) {
                selected.parentElement.replaceChild(this._editor.createText(selected.textContent), selected);
            } else {
                this._editor.format(this._editor.createElement(this._tag.name, {attributes: attributes}));
            }
        }
    }

    /**
     * Open dialog
     *
     * @protected
     */
    _openDialog() {
        this._dialog.open(attributes => this._insert(attributes), this._selectedAttributes())
    }

    /**
     * Returns selected element if it is the same kind of element
     *
     * @protected
     * @return {?HTMLElement}
     */
    _selectedElement() {
        const element = this._editor.getSelectedElement();

        return element && element.localName === this._tag?.name ? element : null;
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

        if (element && this._tag) {
            Array.from(element.attributes).forEach(item => {
                if (this._tag.attributes.includes(item.nodeName)) {
                    attributes[item.nodeName] = item.nodeValue;
                }
            });
        }

        return attributes;
    }
}
