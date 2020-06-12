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
        const sel = this.editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const dialog = this.editor.createElement('dialog', {attributes: {class: 'editor-dialog', 'data-name': this.name}});
        typeof dialog.open === 'boolean' || this.__polyfill(dialog);
        const close = () => {
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            }

            dialog.parentElement.removeChild(dialog);
        };
        dialog.addEventListener('click', event => {
            if (event.target === dialog) {
                close();
            }
        });

        const fieldset = this.editor.createElement('fieldset');
        fieldset.insertAdjacentHTML('beforeend', this._getHtml());
        Object.entries(attributes).forEach(([key, val]) => {
            if (fieldset.elements[key]) {
                fieldset.elements[key].value = val;
            }
        });

        const saveButton = this.editor.createElement('button', {attributes: {class: 'editor-save'}, html: this._('Save')});
        const cancelButton = this.editor.createElement('button', {attributes: {class: 'editor-cancel', type: 'button'}, html: this._('Cancel')});
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
        dialog.open = true;

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
        return this.editor.i18n.translate(this.name, key);
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

    /**
     * Minimal dialog polyfill
     *
     * @private
     * @param {HTMLElement} dialog
     */
    __polyfill(dialog) {
        Object.defineProperty(dialog, 'open', {
            get: function () {
                return dialog.hasAttribute('open');
            },
            set: function (state) {
                if (state) {
                    dialog.setAttribute('open', '');
                } else {
                    dialog.removeAttribute('open');
                }
            }
        });
    }
}
