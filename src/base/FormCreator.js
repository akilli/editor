import Dom from './Dom.js';
import { ErrorMessage, Position, TagName } from './enum.js';
import { isFunction, isString } from './util.js';

/**
 * Form Creator
 */
export default class FormCreator {
    /**
     * DOM manager
     *
     * @type {Dom}
     */
    #dom;

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
     * Initializes a form creator with given submit and cancel button labels and close callback
     *
     * @param {Dom} dom
     * @param {string} submit
     * @param {string} cancel
     * @param {function} close
     */
    constructor(dom, submit, cancel, close) {
        if (!(dom instanceof Dom) || !isString(submit) || !isString(cancel) || !isFunction(close)) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        this.#dom = dom;
        this.#form = this.#dom.createElement(TagName.FORM, { attributes: { method: 'dialog' } });
        this.addFieldset().#addCancelButton(cancel, close).#addSubmitButton(submit);
    }

    /**
     * Adds a new fieldset
     *
     * @return {this}
     */
    addFieldset() {
        const fieldset = this.#dom.createElement(TagName.FIELDSET);

        if (this.#fieldset) {
            this.#fieldset.insertAdjacentElement(Position.AFTEREND, fieldset);
        } else {
            this.#form.insertAdjacentElement(Position.AFTERBEGIN, fieldset);
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
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        this.#fieldset.appendChild(this.#dom.createElement(TagName.LEGEND, { html }));

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
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        Object.assign(attributes, { id: `editor-${name}`, name, type });
        const div = this.#dom.createElement(TagName.DIV);
        div.appendChild(this.#dom.createElement(TagName.LABEL, { attributes: { for: attributes.id }, html: label }));
        div.appendChild(this.#dom.createElement(TagName.INPUT, { attributes }));
        attributes.required && div.setAttribute('data-required', '');
        this.#fieldset.appendChild(div);

        return this;
    }

    /**
     * Adds the cancel button
     *
     * @param {string} html
     * @param {function} click
     * @return {this}
     */
    #addCancelButton(html, click) {
        const button = this.#dom.createElement(TagName.BUTTON, { attributes: { type: 'button' }, html });
        button.addEventListener('click', click);
        this.#form.appendChild(button);

        return this;
    }

    /**
     * Adds the submit button
     *
     * @param {string} html
     * @return {this}
     */
    #addSubmitButton(html) {
        this.#form.appendChild(this.#dom.createElement(TagName.BUTTON, { html }));

        return this;
    }
}
