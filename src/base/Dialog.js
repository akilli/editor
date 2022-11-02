import Editor from './Editor.js';
import FormCreator from './FormCreator.js';
import TagName from './TagName.js';
import { isOptString, isString } from './util.js';

export default class Dialog {
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
     * @type {string|undefined}
     */
    #browserUrl;

    /**
     * @return {string|undefined}
     */
    get browserUrl() {
        return this.#browserUrl;
    }

    /**
     * @type {FormCreator|undefined}
     */
    #formCreator;

    /**
     * @type {FormCreator}
     */
    get formCreator() {
        return this.#formCreator;
    }

    /**
     * @param {Editor} editor
     * @param {string} name
     * @param {string|undefined} browserUrl
     */
    constructor(editor, name, browserUrl = undefined) {
        if (!(editor instanceof Editor) || !isString(name) || !isOptString(browserUrl)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
        this.#name = name;
        this.#browserUrl = browserUrl;
    }

    /**
     * Opens a dialog or a browser window if browser URL is set
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    open(save, attributes = {}) {
        this.browserUrl ? this.#openBrowser(save, attributes) : this.#openDialog(save, attributes);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translate(key);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        throw new Error('Not implemented');
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    #openBrowser(save, attributes = {}) {
        this.editor.dom.open({ url: this.browserUrl, name: this.name, call: save, params: attributes });
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
        this.#formCreator = new FormCreator(this.editor, close);
        this._prepareForm();
        const form = this.formCreator.form;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            close();
            const data = {};
            Array.from(form.elements).forEach((item) => (data[item.name] = item.value));
            save(data);
        });
        Object.entries(attributes).forEach(([key, val]) => form.elements[key] && (form.elements[key].value = val));
        /** @type {DialogElement} */
        const dialog = this.editor.dom.createElement(TagName.DIALOG);
        dialog.addEventListener('close', close);
        this.editor.dom.insertLastChild(form, dialog);
        dialog.show();
        this.editor.dom.insertLastChild(dialog, this.editor.element);
    }

    /**
     * Removes all existing editor dialogs
     *
     * @return {void}
     */
    #cleanup() {
        Array.from(this.editor.element.getElementsByTagName(TagName.DIALOG)).forEach((item) => {
            item.parentElement.removeChild(item);
        });
    }
}
