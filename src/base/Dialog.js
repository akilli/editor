import Editor from './Editor.js';

/**
 * Dialog
 */
export default class Dialog {
    /**
     * Editor
     *
     * @protected
     * @type {Editor}
     */
    _editor;

    /**
     * Name
     *
     * @type {String}
     */
    name;

    /**
     * Initializes a new dialog with given name
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string') {
            throw 'Invalid argument';
        }

        this._editor = editor;
        this.name = name;
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {Function} save
     * @param {Object} [attributes = {}]
     */
    open(save, attributes = {}) {
        const cleanup = () => Array.from(this._editor.element.getElementsByTagName('editor-dialog')).forEach(item => {
            item.parentElement.removeChild(item)
        });
        const sel = this._editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const close = () => {
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            }

            cleanup();
        };
        cleanup();

        const form = this._editor.createElement('form');
        const fieldset = this._editor.createElement('fieldset');
        const cancelButton = this._editor.createElement('button', {attributes: {type: 'button'}, html: this._('Cancel')});
        cancelButton.addEventListener('click', close);
        form.appendChild(fieldset);
        form.appendChild(cancelButton);
        form.appendChild(this._editor.createElement('button', {html: this._('Save')}));
        this._initFieldset(fieldset);
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            close();
            const data = {};
            Array.from(fieldset.elements).forEach(item => data[item.name] = item.value);
            save(data);
        });
        Object.entries(attributes).forEach(([key, val]) => fieldset.elements[key] && (fieldset.elements[key].value = val));

        const dialog = this._editor.createElement('editor-dialog');
        dialog.addEventListener('close', close);
        dialog.appendChild(form);
        dialog.show();
        this._editor.element.appendChild(dialog);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {String} key
     * @return {String}
     */
    _(key) {
        return this._editor.translator.translate(this.name, key);
    }

    /**
     * Initializes form fieldset
     *
     * @protected
     * @param {HTMLFieldSetElement} fieldset
     */
    _initFieldset(fieldset) {
        throw 'Not implemented';
    }

    /**
     * Creates wrapped input element with label
     *
     * @protected
     * @param {String} name
     * @param {String} type
     * @param {String} label
     * @param {Object.<String, String>} [attributes = {}]
     * @return {HTMLDivElement}
     */
    _createInput(name, type, label, attributes = {}) {
        if (!name || typeof name !== 'string' || !type || typeof type !== 'string' || !label || typeof label !== 'string') {
            throw 'Invalid argument';
        }

        Object.assign(attributes, {id: `editor-${name}`, name: name, type: type});
        const div = this._editor.createElement('div');
        div.appendChild(this._editor.createElement('label', {attributes: {for: attributes.id}, html: label}));
        div.appendChild(this._editor.createElement('input', {attributes: attributes}));

        if (attributes.required) {
            div.setAttribute('data-required', '');
        }

        return div;
    }
}
