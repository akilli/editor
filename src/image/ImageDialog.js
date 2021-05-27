import Dialog from '../base/Dialog.js';

/**
 * Image Dialog
 */
export default class ImageDialog extends Dialog {
    /**
     * Initializes a new image dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.dom.createElement('legend', { html: this._('Image') }));
        fieldset.appendChild(this._createInput('src', 'text', this._('URL'), {
            pattern: '(https?|/).+',
            placeholder: this._('Insert URL to image'),
            required: 'required',
        }));
        fieldset.appendChild(this._createInput('alt', 'text', this._('Alternative text'), {
            placeholder: this._('Text shown when media element is not available'),
        }));
        fieldset.appendChild(this._createInput('width', 'number', this._('Width')));
        fieldset.appendChild(this._createInput('height', 'number', this._('Height')));
    }
}
