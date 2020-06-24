import Dialog from '../base/Dialog.js';

/**
 * Data Dialog
 */
export default class DataDialog extends Dialog {
    /**
     * Initializes a new data dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'data');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Data')}</legend>
            <div>
                <label for="editor-value">${this._('Machine-readable Value')}</label>
                <input id="editor-value" name="value" type="text" placeholder="${this._('Insert value or leave empty to remove it')}" />
            </div>
        `;
    }
}
