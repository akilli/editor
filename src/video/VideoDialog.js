import Dialog from '../base/Dialog.js';
import Video from './Video.js';

export default class VideoDialog extends Dialog {
    /**
     * @param {Editor} editor
     * @param {string|undefined} browserUrl
     */
    constructor(editor, browserUrl = undefined) {
        super(editor, Video.name, browserUrl);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Video'))
            .addTextInput('src', this._('URL'), {
                pattern: '(https?|/).+',
                placeholder: this._('Insert URL to video'),
                required: 'required',
            })
            .addNumberInput('width', this._('Width'))
            .addNumberInput('height', this._('Height'))
            .addTextInput('id', this._('ID'));
    }
}
