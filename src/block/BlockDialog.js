import Dialog from '../base/Dialog.js';

/**
 * Block Dialog
 */
export default class BlockDialog extends Dialog {
    /**
     * Initializes a new block dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'block');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Block')}</legend>
            <div class="editor-required">
                <label for="editor-id">${this._('ID')}</label>
                <input id="editor-id" name="id" type="text" required />
            </div>
        `;
    }
}
