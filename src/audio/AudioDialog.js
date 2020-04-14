import Dialog from '../editor/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.t('Audio')}</legend>
            <div data-attr="src">
                <label for="editor-src">${this.t('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.t('Insert URL to media element')}" />
            </div>
            <div data-attr="width">
                <label for="editor-width">${this.t('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div data-attr="height">
                <label for="editor-height">${this.t('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
