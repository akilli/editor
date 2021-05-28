import Editor from './Editor.js';
import { Error, TagGroup } from './enum.js';
import { isEmptyOrString, isPopulatedString } from './util.js';

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
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * Name
     *
     * @type {string}
     */
    #name;

    /**
     * Allows read access to name
     *
     * @return {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Associated tag
     *
     * @type {Tag|undefined}
     */
    #tag;

    /**
     * Allows read access to associated tag
     *
     * @return {Tag|undefined}
     */
    get tag() {
        return this.#tag;
    }

    /**
     * Associated dialog
     *
     * @type {Dialog|undefined}
     */
    #dialog;

    /**
     * Allows read access to associated dialog
     *
     * @return {Dialog|undefined}
     */
    get dialog() {
        return this.#dialog;
    }

    /**
     * Initializes a new editor command optionally with given tag name
     *
     * @param {Editor} editor
     * @param {string} name
     * @param {string|undefined} [tagName = undefined]
     */
    constructor(editor, name, tagName = undefined) {
        if (!(editor instanceof Editor) || !isPopulatedString(name) || !isEmptyOrString(tagName)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#editor = editor;
        this.#name = name;
        this.#tag = tagName && this.editor.tags.get(tagName);
        this.#dialog = this.editor.dialogs.get(name);
    }

    /**
     * Executes the command
     *
     * @return {void}
     */
    execute() {
        this.dialog ? this._openDialog() : this._insert(this._selectedAttributes());
    }

    /**
     * Inserts element
     *
     * @protected
     * @param {Object.<string, string>} [attributes = {}]
     * @return {void}
     */
    _insert(attributes = {}) {
        if (this.tag) {
            Object.keys(attributes).forEach(
                item => this.tag.attributes.includes(item) && attributes[item] || delete attributes[item],
            );
            const selected = this._selectedElement();

            if (this.tag.group !== TagGroup.FORMAT) {
                this.editor.dom.insert(this.editor.dom.createElement(this.tag.name, { attributes: attributes }));
            } else if (selected && Object.keys(attributes).length > 0) {
                selected.parentElement.replaceChild(
                    this.editor.dom.createElement(
                        this.tag.name,
                        { attributes: attributes, html: selected.textContent },
                    ),
                    selected,
                );
            } else if (selected) {
                selected.parentElement.replaceChild(this.editor.dom.createText(selected.textContent), selected);
            } else {
                this.editor.dom.format(this.editor.dom.createElement(this.tag.name, { attributes: attributes }));
            }
        }
    }

    /**
     * Open dialog
     *
     * @protected
     * @return {void}
     */
    _openDialog() {
        this.dialog?.open(attributes => this._insert(attributes), this._selectedAttributes());
    }

    /**
     * Returns selected element if it is the same kind of element
     *
     * @protected
     * @return {HTMLElement|undefined}
     */
    _selectedElement() {
        const element = this.editor.dom.getSelectedElement();

        return element?.localName === this.tag?.name && element;
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
