import Dialog from '../base/Dialog.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * Initializes a new table dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'table');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Table')}</legend>
            <div data-required>
                <label for="editor-rows">${this._('Rows')}</label>
                <input id="editor-rows" name="rows" type="number" value="1" min="1" required />
            </div>
            <div data-required>
                <label for="editor-cols">${this._('Columns')}</label>
                <input id="editor-cols" name="cols" type="number" value="1" min="1" required />
            </div>
        `;
    }
}
