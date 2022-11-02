import Dialog from '../base/Dialog.js';
import Iframe from './Iframe.js';

export default class IframeDialog extends Dialog {
    /**
     * @param {Editor} editor
     * @param {string|undefined} browserUrl
     */
    constructor(editor, browserUrl = undefined) {
        super(editor, Iframe.name, browserUrl);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Iframe'))
            .addTextInput('src', this._('URL'), {
                pattern: '(https?|/).+',
                placeholder: this._('Insert URL to embedded page'),
                required: 'required',
            })
            .addNumberInput('width', this._('Width'))
            .addNumberInput('height', this._('Height'))
            .addTextInput('id', this._('ID'));
    }
}
