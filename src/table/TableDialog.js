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
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Table')}</legend>
            <div data-attr="rows" data-required>
                <label for="editor-rows">${this.translator.get('Rows')}</label>
                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />
            </div>
            <div data-attr="cols" data-required>
                <label for="editor-cols">${this.translator.get('Columns')}</label>
                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />
            </div>
        `;
    }
}
