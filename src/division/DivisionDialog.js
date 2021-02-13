import Dialog from '../base/Dialog.js';

/**
 * Division Dialog
 */
export default class DivisionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'division');
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.createElement('legend', {html: this._('Division')}));
        fieldset.appendChild(this._createInput('class', 'text', this._('CSS class'), {placeholder: this._('Insert CSS class')}));
    }
}
