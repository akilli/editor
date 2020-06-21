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
    _getHtml() {
        return `
            <legend>${this._('Division')}</legend>
            <div>
                <label for="editor-class">${this._('CSS class')}</label>
                <input id="editor-class" name="class" type="text" placeholder="${this._('Insert CSS class')}" />
            </div>
        `;
    }
}
