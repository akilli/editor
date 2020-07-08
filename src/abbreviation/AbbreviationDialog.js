import Dialog from '../base/Dialog.js';

/**
 * Abbreviation Dialog
 */
export default class AbbreviationDialog extends Dialog {
    /**
     * Initializes a new abbreviation dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'abbreviation');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._editor.createElement('legend', {html: this._('Abbreviation')}));
        fieldset.appendChild(this._createInput('title', 'text', this._('Full term'), {
            placeholder: this._('Insert full term or leave empty to remove it'),
        }));
    }
}
