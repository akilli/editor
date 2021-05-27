import Editor from './Editor.js';

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
        if (!(editor instanceof Editor) || !name || typeof name !== 'string') {
            throw 'Invalid argument';
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

        const form = this.editor.dom.createElement('form', { attributes: { method: 'dialog' } });
        /** @type {HTMLFieldSetElement} */
        const fieldset = this.editor.dom.createElement('fieldset');
        const cancelButton = this.editor.dom.createElement(
            'button',
            { attributes: { type: 'button' }, html: this._('Cancel') },
        );
        cancelButton.addEventListener('click', close);
        form.appendChild(fieldset);
        form.appendChild(cancelButton);
        form.appendChild(this.editor.dom.createElement('button', { html: this._('Save') }));
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
        const dialog = this.editor.dom.createElement('editor-dialog');
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
        throw 'Not implemented';
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
        if (!name || typeof name !== 'string'
            || !type || typeof type !== 'string'
            || !label || typeof label !== 'string'
        ) {
            throw 'Invalid argument';
        }

        Object.assign(attributes, { id: `editor-${name}`, name: name, type: type });
        const div = this.editor.dom.createElement('div');
        div.appendChild(this.editor.dom.createElement('label', { attributes: { for: attributes.id }, html: label }));
        div.appendChild(this.editor.dom.createElement('input', { attributes: attributes }));

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
        Array.from(this.editor.element.getElementsByTagName('editor-dialog')).forEach(item => {
            item.parentElement.removeChild(item);
        });
    }
}
