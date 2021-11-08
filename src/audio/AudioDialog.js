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
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Audio'))
            .addTextInput('src', this._('URL'), {
                pattern: '(https?|/).+',
                placeholder: this._('Insert URL to audio'),
                required: 'required',
            })
            .addTextInput('id', this._('ID'));
    }
}
