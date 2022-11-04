import Dialog from '../base/Dialog.js';

export default class AudioDialog extends Dialog {
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
