import Dialog from '../base/Dialog.js';

/**
 * Time Dialog
 */
export default class TimeDialog extends Dialog {
    /**
     * Initializes a new time dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'time');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.createElement('legend', {html: this._('Time')}));
        fieldset.appendChild(this._createInput('datetime', 'text', this._('Machine-readable Datetime'), {
            placeholder: this._('Insert date/time or leave empty to remove it'),
        }));
    }
}
