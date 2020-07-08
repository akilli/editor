import Dialog from '../base/Dialog.js';

/**
 * Iframe Dialog
 */
export default class IframeDialog extends Dialog {
    /**
     * Initializes a new iframe dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._editor.createElement('legend', {html: this._('Iframe')}));
        fieldset.appendChild(this._createInput('src', 'text', this._('URL'), {
            pattern: '(https?|/).+',
            placeholder: this._('Insert URL to embedded page'),
            required: 'required',
        }));
        fieldset.appendChild(this._createInput('width', 'number', this._('Width')));
        fieldset.appendChild(this._createInput('height', 'number', this._('Height')));
    }
}
