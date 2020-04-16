import Dialog from '../base/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Audio')}</legend>
            <div data-attr="src">
                <label for="editor-src">${this.translator.get('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get('Insert URL to media element')}" />
            </div>
            <div data-attr="width">
                <label for="editor-width">${this.translator.get('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div data-attr="height">
                <label for="editor-height">${this.translator.get('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
