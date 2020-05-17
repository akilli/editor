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
            <legend>${this.translator.get('Link')}</legend>
            <div data-attr="href">
                <label for="editor-href">${this.translator.get('URL')}</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.translator.get('Insert URL to add a link or leave empty to unlink')}" />
            </div>
        `;
    }
}
