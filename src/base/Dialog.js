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
        this.editor.document.querySelectorAll('dialog.editor-dialog').forEach(node => node.parentElement.removeChild(node));

        const sel = this.editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const dialog = this.editor.createElement('dialog', {attributes: {class: 'editor-dialog'}});
        const form = this.editor.createElement('form');
        const fieldset = this.editor.createElement('fieldset');
        const cancelButton = this.editor.createElement('button', {attributes: {class: 'editor-cancel', type: 'button'}, html: this.t('Cancel')});
        const saveButton = this.editor.createElement('button', {attributes: {class: 'editor-save'}, html: this.t('Save')});
        const close = () => {
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            }

            dialog.parentElement.removeChild(dialog);
        };

        dialog.appendChild(form);
        dialog.addEventListener('click', ev => {
            if (ev.target === dialog) {
                close();
            }
        });

        // Polyfill
        if (typeof dialog.open !== 'boolean') {
            this.polyfill(dialog);
        }

        dialog.open = true;
        fieldset.insertAdjacentHTML('beforeend', this.getFieldsetHtml());

        for (let [key, val] of Object.entries(attributes)) {
            if (fieldset.elements[key]) {
                fieldset.elements[key].value = val;
            }
        }

        form.appendChild(fieldset);
        form.addEventListener('submit', ev => {
            ev.preventDefault();
            close();
            const data = {};
            Array.from(fieldset.elements).forEach(item => data[item.name] = item.value);
            save(data);
        });
        cancelButton.addEventListener('click', close);
        form.appendChild(cancelButton);
        form.appendChild(saveButton);

        this.editor.element.appendChild(dialog);
    }

    /**
     * Returns dialogs fieldset HTML
     *
     * @protected
     * @return {String}
     */
    getFieldsetHtml() {
        return '';
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {String} key
     * @return {String}
     */
    t(key) {
        return this.editor.i18n.translate(this.name, key);
    }

    /**
     * Minimal dialog polyfill
     *
     * @private
     * @param {HTMLElement} dialog
     */
    polyfill(dialog) {
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
