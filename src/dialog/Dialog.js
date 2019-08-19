import Editor from '../Editor.js';

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
        const dialog = this.editor.document.createElement('dialog');
        const form = this.editor.document.createElement('form');
        const fieldset = this.editor.document.createElement('fieldset');
        const cancel = this.editor.document.createElement('button');
        const save = this.editor.document.createElement('button');
        const close = () => {
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            }

            dialog.parentElement.removeChild(dialog);
        };

        dialog.appendChild(form);
        dialog.classList.add('editor-dialog');
        dialog.addEventListener('click', ev => {
            if (ev.target === dialog) {
                close();
            }
        });
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
        cancel.innerText = 'Cancel';
        cancel.type = 'button';
        cancel.setAttribute('data-action', 'cancel');
        cancel.addEventListener('click', close);
        form.appendChild(cancel);
        save.innerText = 'Save';
        save.setAttribute('data-action', 'save');
        form.appendChild(save);

        this.editor.element.appendChild(dialog);
    }
}
