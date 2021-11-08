import Dialog from '../base/Dialog.js';
import Image from './Image.js';

/**
 * Image Dialog
 */
export default class ImageDialog extends Dialog {
    /**
     * Initializes a new image dialog
     *
     * @param {Editor} editor
     * @param {string|undefined} url
     */
    constructor(editor, url = undefined) {
        super(editor, Image.name, url);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Image'))
            .addTextInput('src', this._('URL'), {
                pattern: '(https?|/).+',
                placeholder: this._('Insert URL to image'),
                required: 'required',
            })
            .addTextInput('alt', this._('Alternative text'), {
                placeholder: this._('Text shown when media element is not available'),
            })
            .addNumberInput('width', this._('Width'))
            .addNumberInput('height', this._('Height'))
            .addTextInput('id', this._('ID'));
    }
}
