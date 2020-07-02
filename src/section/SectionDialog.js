import Dialog from '../base/Dialog.js';

/**
 * Section Dialog
 */
export default class SectionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'section');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.createElement('legend', {html: this._('Section')}));
        fieldset.appendChild(this._createInput('class', 'text', this._('CSS class'), {placeholder: this._('Insert CSS class')}));
    }
}
