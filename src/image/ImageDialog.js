import Dialog from '../editor/Dialog.js';

/**
 * Image Dialog
 */
export default class ImageDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.t('Image')}</legend>
            <div data-attr="src">
                <label for="editor-src">${this.t('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.t('Insert URL to media element')}" />
            </div>
            <div data-attr="alt">
                <label for="editor-alt">${this.t('Alternative text')}</label>
                <input id="editor-alt" name="alt" type="text" placeholder="${this.t('Replacement text for use when media elements are not available')}" />
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
