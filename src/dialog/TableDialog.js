import Dialog from './Dialog.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * @inheritDoc
     */
    constructor(editor, save) {
        super(editor, save);
        this.html = `
            <legend>${this.editor.i18n('Table')}</legend>
            <div data-attr="rows" data-required>
                <label for="editor-rows">${this.editor.i18n('Rows')}</label>
                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />
            </div>
            <div data-attr="cols" data-required>
                <label for="editor-cols">${this.editor.i18n('Columns')}</label>
                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />
            </div>
        `;
    }
}
