import Dialog from '../base/Dialog.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * Initializes a new link dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'link');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._editor.createElement('legend', {html: this._('Link')}));
        fieldset.appendChild(this._createInput('href', 'text', this._('URL'), {
            pattern: '(https?|/|mailto:).+',
            placeholder: this._('Insert URL to add a link or leave empty to unlink'),
        }));
    }
}
