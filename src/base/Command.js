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
    #editor;

    /**
     * Name
     *
     * @type {string}
     */
    #name;

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
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * Allows read access to name
     *
     * @return {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {string} name
     * @param {?string} [tagName = null]
     */
    constructor(editor, name, tagName = null) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string' || tagName && typeof tagName !== 'string') {
            throw 'Invalid argument';
        }

        this.#editor = editor;
        this.#name = name;
        this._tag = tagName ? this.editor.tags.get(tagName) : null;
        this._dialog = this.editor.dialogs.get(name);
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
      * @param {Object.<string, string>} [attributes = {}]
      */
    _insert(attributes = {}) {
        if (this._tag) {
            Object.keys(attributes).forEach(item => this._tag.attributes.includes(item) && attributes[item] || delete attributes[item]);
            const selected = this._selectedElement();

            if (this._tag.group !== 'format') {
                this.editor.insert(this.editor.createElement(this._tag.name, {attributes: attributes}));
            } else if (selected && Object.keys(attributes).length > 0) {
                selected.parentElement.replaceChild(
                    this.editor.createElement(this._tag.name, {attributes: attributes, html: selected.textContent}),
                    selected
                );
            } else if (selected) {
                selected.parentElement.replaceChild(this.editor.createText(selected.textContent), selected);
            } else {
                this.editor.format(this.editor.createElement(this._tag.name, {attributes: attributes}));
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
        const element = this.editor.getSelectedElement();

        return element && element.localName === this._tag?.name ? element : null;
    }

    /**
     * Returns attributes from selected element if it is the same kind of element
     *
     * @protected
     * @return {Object.<string, string>}
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
