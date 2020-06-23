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

        const dialog = this.editor.createElement('editor-dialog');
        dialog.addEventListener('close', close);

        const fieldset = this.editor.createElement('fieldset');
        fieldset.insertAdjacentHTML('beforeend', this._getHtml());
        Object.entries(attributes).forEach(([key, val]) => {
            if (fieldset.elements[key]) {
                fieldset.elements[key].value = val;
            }
        });

        const saveButton = this.editor.createElement('button', {html: this._('Save')});
        const cancelButton = this.editor.createElement('button', {attributes: {type: 'button'}, html: this._('Cancel')});
        cancelButton.addEventListener('click', close);

        const form = this.editor.createElement('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            close();
            const data = {};
            Array.from(fieldset.elements).forEach(item => data[item.name] = item.value);
            save(data);
        });
        form.appendChild(fieldset);
        form.appendChild(cancelButton);
        form.appendChild(saveButton);

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
     * Returns dialogs fieldset HTML
     *
     * @protected
     * @return {String}
     */
    _getHtml() {
        return '';
    }
}
