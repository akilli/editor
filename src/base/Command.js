import Editor from './Editor.js';
import TagGroup from './TagGroup.js';
import { isOptString, isString } from './util.js';

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
        if (!(editor instanceof Editor) || !isString(name) || !isOptString(tagName)) {
            throw new TypeError('Invalid argument');
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
        this.dialog ? this.openDialog() : this.insert(this.#selectedAttributes());
    }

    /**
     * Inserts element
     *
     * @param {Object.<string, string>} [attributes = {}]
     * @return {void}
     */
    insert(attributes = {}) {
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
     * Open dialog
     *
     * @return {void}
     */
    openDialog() {
        this.dialog?.open((attributes) => this.insert(attributes), this.#selectedAttributes());
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
