import Audio from './Audio.js';
import Dialog from '../base/Dialog.js';

export default class AudioDialog extends Dialog {
    /**
     * @param {Editor} editor
     * @param {string|undefined} browserUrl
     */
    constructor(editor, browserUrl = undefined) {
        super(editor, Audio.name, browserUrl);
    }

    /**
     * @protected
     * @return {void}
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
