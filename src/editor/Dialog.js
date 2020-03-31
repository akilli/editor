import Editor from './Editor.js';

/**
 * Dialog
 */
export default class Dialog {
    /**
     * Initializes a new editor dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     * @param {String} [html = '']
     */
    constructor(editor, save, html = '') {
        if (!(editor instanceof Editor) || typeof save !== 'function' || typeof html !== 'string') {
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
         * Save callback
         *
         * @type {Function}
         * @readonly
         */
        this.save = save;

        /**
         * Form fields HTML
         *
         * @type {String}
         * @readonly
         */
        this.html = html;
    }

    /**
     * Opens a dialog and executes given callback on save
     *
     * @param {Object} [oldData = {}]
     */
    open(oldData = {}) {
        this.editor.document.querySelectorAll('dialog.editor-dialog').forEach(node => node.parentElement.removeChild(node));

        const sel = this.editor.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const dialog = this.editor.createElement('dialog', {class: 'editor-dialog'});
        const form = this.editor.createElement('form');
        const fieldset = this.editor.createElement('fieldset');
        const cancel = this.editor.createElement('button', {type: 'button', 'data-action': 'cancel'});
        const save = this.editor.createElement('button', {'data-action': 'save'});
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

        dialog.open = true;
        fieldset.insertAdjacentHTML('beforeend', this.html);
        Object.getOwnPropertyNames(oldData).forEach(item => {
            if (fieldset.elements[item]) {
                fieldset.elements[item].value = oldData[item];
            }
        });
        form.appendChild(fieldset);
        form.addEventListener('submit', ev => {
            ev.preventDefault();
            close();
            const data = {};
            Array.from(fieldset.elements).forEach(item => data[item.name] = item.value);
            this.save(data);
        });
        cancel.textContent = this.editor.t('Cancel');
        cancel.addEventListener('click', close);
        form.appendChild(cancel);
        save.textContent = this.editor.t('Save');
        form.appendChild(save);

        this.editor.element.appendChild(dialog);
    }
}
