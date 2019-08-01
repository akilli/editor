import Dialog from './Dialog.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * @inheritDoc
     */
    constructor(editor, save) {
        super(editor, save, `
            <legend>Link</legend>
            <div data-attr="href">
                <label for="editor-href">URL</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="Insert URL to add a link or leave empty to unlink" />
            </div>
        `);
    }
}
