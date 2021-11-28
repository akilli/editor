import Editor from './Editor.js';
import FormCreator from './FormCreator.js';
import { ErrorMessage, TagName } from './enum.js';
import { isOptString, isString } from './util.js';

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
     * Form creator
     *
     * @type {FormCreator|undefined}
     */
    #formCreator;

    /**
     * Allows read access to form creator
     *
     * @type {FormCreator}
     */
    get formCreator() {
        return this.#formCreator;
    }

    /**
     * Initializes a new dialog with given name
     *
     * @param {Editor} editor
     * @param {string} name
     * @param {string|undefined} url
     */
    constructor(editor, name, url = undefined) {
        if (!(editor instanceof Editor) || !isString(name) || !isOptString(url)) {
            throw ErrorMessage.INVALID_ARGUMENT;
        }

        this.#editor = editor;
        this.#name = name;
        this.#url = url;
    }

    /**
     * Opens a dialog or a browser window if browser URL is set
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    open(save, attributes = {}) {
        this.url ? this.#openBrowser(save, attributes) : this.#openDialog(save, attributes);
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
     * Prepares the form
     *
     * @protected
     * @return {void}
     */
    _prepareForm() {
        throw ErrorMessage.NOT_IMPLEMENTED;
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    #openBrowser(save, attributes = {}) {
        this.editor.dom.open({ url: this.url, name: this.name, call: save, params: attributes });
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    #openDialog(save, attributes = {}) {
        const range = this.editor.dom.getRange();
        const close = () => {
            range && this.editor.dom.setRange(range);
            this.#cleanup();
        };
        this.#cleanup();
        this.#formCreator = new FormCreator(this.editor.dom, this._('Save'), this._('Cancel'), close);
        this._prepareForm();
        const form = this.formCreator.form;
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            close();
            const data = {};
            Array.from(form.elements).forEach(item => (data[item.name] = item.value));
            save(data);
        });
        Object.entries(attributes).forEach(([key, val]) => form.elements[key] && (form.elements[key].value = val));
        /** @type {DialogElement} */
        const dialog = this.editor.dom.createElement(TagName.DIALOG);
        dialog.addEventListener('close', close);
        dialog.appendChild(form);
        dialog.show();
        this.editor.element.appendChild(dialog);
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
