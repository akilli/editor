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
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Image')}</legend>
            <div class="editor-required">
                <label for="editor-src">${this.translator.get('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get('Insert URL to media element')}" required />
            </div>
            <div>
                <label for="editor-alt">${this.translator.get('Alternative text')}</label>
                <input id="editor-alt" name="alt" type="text" placeholder="${this.translator.get('Replacement text for use when media elements are not available')}" />
            </div>
            <div>
                <label for="editor-width">${this.translator.get('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div>
                <label for="editor-height">${this.translator.get('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
