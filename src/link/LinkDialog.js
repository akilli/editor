import Dialog from '../editor/Dialog.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.t('Link')}</legend>
            <div data-attr="href">
                <label for="editor-href">${this.t('URL')}</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.t('Insert URL to add a link or leave empty to unlink')}" />
            </div>
        `;
    }
}
