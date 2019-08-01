import Dialog from './Dialog.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * @inheritDoc
     */
    constructor(editor, save) {
        super(editor, save, `
            <legend>Table</legend>
            <div data-attr="rows" data-required>
                <label for="editor-rows">Rows</label>
                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />
            </div>
            <div data-attr="cols" data-required>
                <label for="editor-cols">Cols</label>
                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />
            </div>
        `);
    }
}
