import Editor from './Editor.js';
import { Error, TagName } from './enum.js';
import { isEmptyOrString, isPopulatedString } from './util.js';

/**
 * Dialog
 */
export default class Dialog {
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
     * Browser URL
     *
     * @type {string|undefined}
     */
    #url;

    /**
     * Allows read access to browser URL
     *
     * @return {string|undefined}
     */
    get url() {
        return this.#url;
    }

    /**
     * Initializes a new dialog with given name
     *
     * @param {Editor} editor
     * @param {string} name
     * @param {string|undefined} url
     */
    constructor(editor, name, url = undefined) {
        if (!(editor instanceof Editor) || !isPopulatedString(name) || !isEmptyOrString(url)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#editor = editor;
        this.#name = name;
        this.#url = url || undefined;
    }

    /**
     * Opens a dialog or a browser window if browser URL is set
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    open(save, attributes = {}) {
        this.url ? this._openBrowser(save, attributes) : this._openDialog(save, attributes);
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    _openBrowser(save, attributes = {}) {
        this.editor.dom.open({ url: this.url, name: this.name, call: save, params: attributes });
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    _openDialog(save, attributes = {}) {
        const range = this.editor.dom.getRange();
        const close = () => {
            range && this.editor.dom.setRange(range);
            this.#cleanup();
        };
        this.#cleanup();

        const form = this.editor.dom.createElement(TagName.FORM, { attributes: { method: 'dialog' } });
        /** @type {HTMLFieldSetElement} */
        const fieldset = this.editor.dom.createElement(TagName.FIELDSET);
        const cancelButton = this.editor.dom.createElement(
            TagName.BUTTON,
            { attributes: { type: 'button' }, html: this._('Cancel') },
        );
        cancelButton.addEventListener('click', close);
        form.appendChild(fieldset);
        form.appendChild(cancelButton);
        form.appendChild(this.editor.dom.createElement(TagName.BUTTON, { html: this._('Save') }));
        this._initFieldset(fieldset);
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            close();
            const data = {};
            Array.from(fieldset.elements).forEach(item => (data[item.name] = item.value));
            save(data);
        });
        Object.entries(attributes).forEach(
            ([key, val]) => fieldset.elements[key] && (fieldset.elements[key].value = val),
        );

        /** @type {DialogElement} */
        const dialog = this.editor.dom.createElement(TagName.DIALOG);
        dialog.addEventListener('close', close);
        dialog.appendChild(form);
        dialog.show();
        this.editor.element.appendChild(dialog);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translator.translate(this.name, key);
    }

    /**
     * Initializes form fieldset
     *
     * @protected
     * @param {HTMLFieldSetElement} fieldset
     * @return {void}
     */
    _initFieldset(fieldset) {
        throw Error.NOT_IMPLEMENTED;
    }

    /**
     * Creates a legend element with given HTML
     *
     * @protected
     * @param {string} html
     * @return {HTMLLegendElement}
     */
    _createLegend(html) {
        if (!isPopulatedString(html)) {
            throw Error.INVALID_ARGUMENT;
        }

        return this.editor.dom.createElement(TagName.LEGEND, { html });
    }

    /**
     * Creates wrapped input element with label
     *
     * @protected
     * @param {string} name
     * @param {string} type
     * @param {string} label
     * @param {Object.<string, string>} [attributes = {}]
     * @return {HTMLElement}
     */
    _createInput(name, type, label, attributes = {}) {
        if (!isPopulatedString(name) || !isPopulatedString(type) || !isPopulatedString(label)) {
            throw Error.INVALID_ARGUMENT;
        }

        Object.assign(attributes, { id: `editor-${name}`, name, type });
        const div = this.editor.dom.createElement(TagName.DIV);
        div.appendChild(
            this.editor.dom.createElement(TagName.LABEL, { attributes: { for: attributes.id }, html: label }),
        );
        div.appendChild(this.editor.dom.createElement(TagName.INPUT, { attributes }));

        if (attributes.required) {
            div.setAttribute('data-required', '');
        }

        return div;
    }

    /**
     * Removes all existing editor dialogs
     *
     * @return {void}
     */
    #cleanup() {
        Array.from(this.editor.element.getElementsByTagName(TagName.DIALOG)).forEach(item => {
            item.parentElement.removeChild(item);
        });
    }
}
