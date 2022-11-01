import Base from './Base.js';
import Editor from './Editor.js';
import TagName from './TagName.js';
import { isFunction, isString } from './util.js';

/**
 * Form Creator
 */
export default class FormCreator {
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
     * Form element
     *
     * @type {HTMLFormElement}
     */
    #form;

    /**
     * Allows read access to form element
     *
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
     * Initializes a form creator with given editor and cancel callback
     *
     * @param {Editor} editor
     * @param {function} cancel
     */
    constructor(editor, cancel) {
        if (!(editor instanceof Editor) || !isFunction(cancel)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
        this.#form = this.editor.dom.createElement(TagName.FORM, { attributes: { method: 'dialog' } });
        this.addFieldset().#addCancelButton(cancel).#addSubmitButton();
    }

    /**
     * Adds a new fieldset
     *
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
     * Adds a legend with given HTML
     *
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
            div,
        );
        this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.INPUT, { attributes }), div);
        attributes.required && div.setAttribute('data-required', '');
        this.editor.dom.insertLastChild(div, this.#fieldset);

        return this;
    }

    /**
     * Adds the cancel button
     *
     * @param {function} cancel
     * @return {this}
     */
    #addCancelButton(cancel) {
        const html = this.#i18n('Cancel');
        const button = this.editor.dom.createElement(TagName.BUTTON, { attributes: { type: 'button' }, html });
        button.addEventListener('click', cancel);
        this.editor.dom.insertLastChild(button, this.#form);

        return this;
    }

    /**
     * Adds the submit button
     *
     * @return {this}
     */
    #addSubmitButton() {
        const button = this.editor.dom.createElement(TagName.BUTTON, { html: this.#i18n('Save') });
        this.editor.dom.insertLastChild(button, this.#form);

        return this;
    }

    /**
     * Translates given string with base context
     *
     * @param {string} key
     * @return {string}
     */
    #i18n(key) {
        return this.editor.translator.translate(Base.name, key);
    }
}
