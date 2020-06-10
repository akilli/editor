import Dialog from '../base/Dialog.js';

/**
 * Image Dialog
 */
export default class ImageDialog extends Dialog {
    /**
     * Initializes a new image dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Image')}</legend>
            <div class="editor-required">
                <label for="editor-src">${this._('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this._('Insert URL to media element')}" required />
            </div>
            <div>
                <label for="editor-alt">${this._('Alternative text')}</label>
                <input id="editor-alt" name="alt" type="text" placeholder="${this._('Replacement text for use when media elements are not available')}" />
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
