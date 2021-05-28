import Audio from './Audio.js';
import Dialog from '../base/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * Initializes a new audio dialog
     *
     * @param {Editor} editor
     * @param {string|undefined} url
     */
    constructor(editor, url = undefined) {
        super(editor, Audio.name, url);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._createLegend(this._('Audio')));
        fieldset.appendChild(this._createInput('src', 'text', this._('URL'), {
            pattern: '(https?|/).+',
            placeholder: this._('Insert URL to audio'),
            required: 'required',
        }));
    }
}
