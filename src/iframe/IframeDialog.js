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
            <legend>${this.t('Iframe')}</legend>
            <div class="editor-required">
                <label for="editor-src">${this.t('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.t('Insert URL to media element')}" required />
            </div>
            <div>
                <label for="editor-width">${this.t('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div>
                <label for="editor-height">${this.t('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
