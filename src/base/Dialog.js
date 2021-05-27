import Editor from './Editor.js';
import { Error, TagName, Type } from './enum.js';

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
     * Initializes a new dialog with given name
     *
     * @param {Editor} editor
     * @param {string} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor) || !name || typeof name !== Type.STRING) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#editor = editor;
        this.#name = name;
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {function} save
     * @param {Object} [attributes = {}]
     * @return {void}
     */
    open(save, attributes = {}) {
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
        if (!name
            || typeof name !== Type.STRING
            || !type
            || typeof type !== Type.STRING
            || !label
            || typeof label !== Type.STRING
        ) {
            throw Error.INVALID_ARGUMENT;
        }

        Object.assign(attributes, { id: `editor-${name}`, name: name, type: type });
        const div = this.editor.dom.createElement(TagName.DIV);
        div.appendChild(
            this.editor.dom.createElement(TagName.LABEL, { attributes: { for: attributes.id }, html: label }),
        );
        div.appendChild(this.editor.dom.createElement(TagName.INPUT, { attributes: attributes }));

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
