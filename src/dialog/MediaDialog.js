import Dialog from './Dialog.js';

/**
 * Media Dialog
 */
export default class MediaDialog extends Dialog {
    /**
     * @inheritDoc
     */
    constructor(editor, save) {
        super(editor, save, `
            <legend>Media</legend>
            <div data-attr="src">
                <label for="editor-src">URL</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="Insert URL to media" />
            </div>
            <div data-attr="alt">
                <label for="editor-alt">Alternative text</label>
                <input id="editor-alt" name="alt" type="text" placeholder="Replacement text for use when media elements are not available" />
            </div>
        `);
    }
}
