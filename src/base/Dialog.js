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
    editor;

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

        this.editor = editor;
        this.name = name;
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {Function} save
     * @param {Object} [attributes = {}]
     */
    open(save, attributes = {}) {
        const cleanup = () => Array.from(this.editor.element.getElementsByTagName('editor-dialog')).forEach(item => {
            item.parentElement.removeChild(item)
        });
        const sel = this.editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const close = () => {
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            }

            cleanup();
        };
        cleanup();

        const form = this.editor.createElement('form');
        const fieldset = this.editor.createElement('fieldset');
        const cancelButton = this.editor.createElement('button', {attributes: {type: 'button'}, html: this._('Cancel')});
        cancelButton.addEventListener('click', close);
        form.appendChild(fieldset);
        form.appendChild(cancelButton);
        form.appendChild(this.editor.createElement('button', {html: this._('Save')}));
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

        const dialog = this.editor.createElement('editor-dialog');
        dialog.addEventListener('close', close);
        dialog.appendChild(form);
        dialog.show();
        this.editor.element.appendChild(dialog);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {String} key
     * @return {String}
     */
    _(key) {
        return this.editor.translator.translate(this.name, key);
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
        const div = this.editor.createElement('div');
        div.appendChild(this.editor.createElement('label', {attributes: {for: attributes.id}, html: label}));
        div.appendChild(this.editor.createElement('input', {attributes: attributes}));

        if (attributes.required) {
            div.setAttribute('data-required', '');
        }

        return div;
    }
}
