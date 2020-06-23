import Dialog from '../base/Dialog.js';

/**
 * Iframe Dialog
 */
export default class IframeDialog extends Dialog {
    /**
     * Initializes a new iframe dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Iframe')}</legend>
            <div data-required>
                <label for="editor-src">${this._('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this._('Insert URL to media element')}" required />
            </div>
            <div>
                <label for="editor-width">${this._('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div>
                <label for="editor-height">${this._('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
