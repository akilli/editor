import Editor from './Editor.js';
import TagName from './TagName.js';
import { isString } from './util.js';

export default class FormCreator {
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
     * @type {HTMLFormElement}
     */
    #form;

    /**
     * @return {HTMLFormElement}
     */
    get form() {
        return this.#form;
    }

    /**
     * Current fieldset
     *
     * @type {HTMLFieldSetElement}
     */
    #fieldset;

    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
        this.#form = this.editor.dom.createElement(TagName.FORM, { attributes: { method: 'dialog' } });
        this.addFieldset().#addCancelButton().#addSubmitButton();
    }

    /**
     * @return {this}
     */
    addFieldset() {
        const fieldset = this.editor.dom.createElement(TagName.FIELDSET);

        if (this.#fieldset) {
            this.editor.dom.insertAfter(fieldset, this.#fieldset);
        } else {
            this.editor.dom.insertFirstChild(fieldset, this.#form);
        }

        this.#fieldset = fieldset;

        return this;
    }

    /**
     * @param {string} html
     * @return {this}
     */
    addLegend(html) {
        if (!isString(html)) {
            throw new TypeError('Invalid argument');
        }

        this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.LEGEND, { html }), this.#fieldset);

        return this;
    }

    /**
     * Adds a wrapped text input element with label
     *
     * @param {string} name
     * @param {string} label
     * @param {Object.<string, string>} [attributes = {}]
     * @return {this}
     */
    addTextInput(name, label, attributes = {}) {
        return this.addInput(name, label, attributes, 'text');
    }

    /**
     * Adds a wrapped number input element with label
     *
     * @param {string} name
     * @param {string} label
     * @param {Object.<string, string>} [attributes = {}]
     * @return {this}
     */
    addNumberInput(name, label, attributes = {}) {
        return this.addInput(name, label, attributes, 'number');
    }

    /**
     * Adds a wrapped input element with label
     *
     * @param {string} name
     * @param {string} label
     * @param {Object.<string, string>} [attributes = {}]
     * @param {string} [type = 'text']
     * @return {this}
     */
    addInput(name, label, attributes = {}, type = 'text') {
        if (!isString(name) || !isString(label) || !isString(type)) {
            throw new TypeError('Invalid argument');
        }

        Object.assign(attributes, { id: `editor-${name}`, name, type });
        const div = this.editor.dom.createElement(TagName.DIV);
        this.editor.dom.insertLastChild(
            this.editor.dom.createElement(TagName.LABEL, { attributes: { for: attributes.id }, html: label }),
            div
        );
        this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.INPUT, { attributes }), div);
        attributes.required && div.setAttribute('data-required', '');
        this.editor.dom.insertLastChild(div, this.#fieldset);

        return this;
    }

    /**
     * @return {this}
     */
    #addCancelButton() {
        const html = this.#t('Cancel');
        const button = this.editor.dom.createElement(TagName.BUTTON, { attributes: { type: 'reset' }, html });
        this.editor.dom.insertLastChild(button, this.#form);

        return this;
    }

    /**
     * @return {this}
     */
    #addSubmitButton() {
        const button = this.editor.dom.createElement(TagName.BUTTON, { html: this.#t('Save') });
        this.editor.dom.insertLastChild(button, this.#form);

        return this;
    }

    /**
     * Translates given string
     *
     * @param {string} key
     * @return {string}
     */
    #t(key) {
        return this.editor.translate(key);
    }
}
