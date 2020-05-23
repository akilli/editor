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
            <legend>${this.t('Table')}</legend>
            <div class="editor-required">
                <label for="editor-rows">${this.t('Rows')}</label>
                <input id="editor-rows" name="rows" type="number" value="1" min="1" required />
            </div>
            <div class="editor-required">
                <label for="editor-cols">${this.t('Columns')}</label>
                <input id="editor-cols" name="cols" type="number" value="1" min="1" required />
            </div>
        `;
    }
}
