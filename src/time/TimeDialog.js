import Dialog from '../base/Dialog.js';

/**
 * Time Dialog
 */
export default class TimeDialog extends Dialog {
    /**
     * Initializes a new time dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'time');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Time')}</legend>
            <div>
                <label for="editor-datetime">${this._('Machine-readable Datetime')}</label>
                <input id="editor-datetime" name="datetime" type="text" placeholder="${this._('Insert date and/or time or leave empty to remove it')}" />
            </div>
        `;
    }
}
