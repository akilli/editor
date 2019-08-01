import Dialog from './Dialog.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * Initializes a new editor dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     */
    constructor(editor, save) {
        super(editor, save, `
            <div data-attr="rows" data-required>
                <label for="rows">Rows</label>
                <input id="rows" name="rows" type="number" value="1" required="required" min="1" />
            </div>
            <div data-attr="cols" data-required>
                <label for="cols">Cols</label>
                <input id="cols" name="cols" type="number" value="1" required="required" min="1" />
            </div>
        `);
    }
}
