import Editor from './Editor.js';
import Translator from './Translator.js';

/**
 * Dialog
 */
export default class Dialog {
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

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         * @readonly
         */
        this.name = name;

        /**
         * Translator
         *
         * @type {Translator}
         */
        this.translator = this.editor.translators.get(this.name) || new Translator(this.name, {});
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {Function} save
     * @param {Object} [oldData = {}]
     */
    open(save, oldData = {}) {
        this.editor.document.querySelectorAll('dialog.editor-dialog').forEach(node => node.parentElement.removeChild(node));

        const sel = this.editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const dialog = this.editor.createElement('dialog', {class: 'editor-dialog'});
        const form = this.editor.createElement('form');
        const fieldset = this.editor.createElement('fieldset');
        const cancelButton = this.editor.createElement('button', {type: 'button', 'data-action': 'cancel'}, this.translator.get('Cancel'));
        const saveButton = this.editor.createElement('button', {'data-action': 'save'}, this.translator.get('Save'));
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

        for (let [key, val] of Object.entries(oldData)) {
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
     * @return {String}
     */
    getFieldsetHtml() {
        throw 'Not implemented';
    }

    /**
     * Minimal dialog polyfill
     *
     * @private
     *
     * @param {HTMLElement} dialog
     */
    polyfill(dialog) {
        Object.defineProperty(dialog, 'open', {
            get: function () {
                return this.hasAttribute('open');
            },
            set: function (state) {
                if (state) {
                    this.setAttribute('open', '');
                } else {
                    this.removeAttribute('open');
                }
            }
        });
    }
}