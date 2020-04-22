import Dialog from '../base/Dialog.js';

/**
 * Block Dialog
 */
export default class BlockDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Block')}</legend>
            <div data-attr="id" data-required>
                <label for="editor-id">${this.translator.get('ID')}</label>
                <input id="editor-id" name="id" type="text" required="required" />
            </div>
        `;
    }
}
