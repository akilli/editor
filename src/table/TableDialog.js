import Dialog from '../editor/Dialog.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.editor.t('Table')}</legend>
            <div data-attr="rows" data-required>
                <label for="editor-rows">${this.editor.t('Rows')}</label>
                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />
            </div>
            <div data-attr="cols" data-required>
                <label for="editor-cols">${this.editor.t('Columns')}</label>
                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />
            </div>
        `;
    }
}
