import Dialog from '../base/Dialog.js';

/**
 * Video Dialog
 */
export default class VideoDialog extends Dialog {
    /**
     * Initializes a new video dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'video');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._editor.createElement('legend', {html: this._('Video')}));
        fieldset.appendChild(this._createInput('src', 'text', this._('URL'), {
            pattern: '(https?|/).+',
            placeholder: this._('Insert URL to video'),
            required: 'required',
        }));
        fieldset.appendChild(this._createInput('width', 'number', this._('Width')));
        fieldset.appendChild(this._createInput('height', 'number', this._('Height')));
    }
}
