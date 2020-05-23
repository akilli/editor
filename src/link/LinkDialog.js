import Dialog from '../base/Dialog.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * Initializes a new link dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'link');
    }

    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.t('Link')}</legend>
            <div>
                <label for="editor-href">${this.t('URL')}</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.t('Insert URL to add a link or leave empty to unlink')}" />
            </div>
        `;
    }
}
