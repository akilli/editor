import Dialog from '../base/Dialog.js';

/**
 * Data Dialog
 */
export default class DataDialog extends Dialog {
    /**
     * Initializes a new data dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'data');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.dom.createElement('legend', { html: this._('Data') }));
        fieldset.appendChild(this._createInput('value', 'text', this._('Machine-readable Value'), {
            placeholder: this._('Insert value or leave empty to remove it'),
        }));
    }
}
