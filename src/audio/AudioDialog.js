import Dialog from '../base/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * Initializes a new audio dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'audio');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.dom.createElement('legend', { html: this._('Audio') }));
        fieldset.appendChild(this._createInput('src', 'text', this._('URL'), {
            pattern: '(https?|/).+',
            placeholder: this._('Insert URL to audio'),
            required: 'required',
        }));
    }
}
