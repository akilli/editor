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
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Iframe')}</legend>
            <div class="editor-required">
                <label for="editor-src">${this.translator.get('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get('Insert URL to media element')}" required />
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
