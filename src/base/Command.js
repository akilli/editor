import Editor from './Editor.js';
import TagGroup from './TagGroup.js';
import { isOptString, isString } from './util.js';

export default class Command {
    /**
     * @type {Editor}
     */
    #editor;

    /**
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * @type {string}
     */
    #name;

    /**
     * @return {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @type {Tag|undefined}
     */
    #tag;

    /**
     * @return {Tag|undefined}
     */
    get tag() {
        return this.#tag;
    }

    /**
     * @type {Dialog|undefined}
     */
    #dialog;

    /**
     * @return {Dialog|undefined}
     */
    get dialog() {
        return this.#dialog;
    }

    /**
     * @param {Editor} editor
     * @param {string} name
     * @param {string|undefined} [tagName = undefined]
     */
    constructor(editor, name, tagName = undefined) {
        if (!(editor instanceof Editor) || !isString(name) || !isOptString(tagName)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
        this.#name = name;
        this.#tag = tagName && this.editor.tags.get(tagName);
        this.#dialog = this.editor.dialogs.get(name);
    }

    /**
     * @return {void}
     */
    execute() {
        this.dialog ? this._openDialog() : this._insert(this.#selectedAttributes());
    }

    /**
     * @protected
     * @param {Object.<string, string>} [attributes = {}]
     * @return {void}
     */
    _insert(attributes = {}) {
        if (!this.tag) {
            return;
        }

        this.#filterAttributes(attributes);
        const element = this.editor.dom.getSelectedElementByName(this.tag.name);

        if (this.tag.group !== TagGroup.FORMAT) {
            this.editor.dom.insert(this.editor.dom.createElement(this.tag.name, { attributes }));
        } else if (element && Object.keys(attributes).length > 0) {
            element.parentElement.replaceChild(
                this.editor.dom.createElement(this.tag.name, { attributes, html: element.textContent }),
                element
            );
        } else if (element) {
            element.parentElement.replaceChild(this.editor.dom.createText(element.textContent), element);
        } else {
            this.editor.dom.format(this.editor.dom.createElement(this.tag.name, { attributes }));
        }
    }

    /**
     * @protected
     * @return {void}
     */
    _openDialog() {
        this.dialog?.open((attributes) => this._insert(attributes), this.#selectedAttributes());
    }

    /**
     * Returns attributes from selected element if its tag name matches configured tag name
     *
     * @return {Object.<string, string>}
     */
    #selectedAttributes() {
        if (!this.tag) {
            return {};
        }

        const attributes = this.editor.dom.getSelectedAttributesByName(this.tag.name);
        this.#filterAttributes(attributes);

        return attributes;
    }

    /**
     * Filters allowed attributes
     *
     * @param {Object.<string, string>} attributes
     * @return {void}
     */
    #filterAttributes(attributes) {
        Object.keys(attributes).forEach(
            (item) => (this.tag.attributes.includes(item) && attributes[item]) || delete attributes[item]
        );
    }
}
