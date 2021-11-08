import Dialog from '../base/Dialog.js';
import Iframe from './Iframe.js';

/**
 * Iframe Dialog
 */
export default class IframeDialog extends Dialog {
    /**
     * Initializes a new iframe dialog
     *
     * @param {Editor} editor
     * @param {string|undefined} url
     */
    constructor(editor, url = undefined) {
        super(editor, Iframe.name, url);
    }

    /**
     * @inheritDoc
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
