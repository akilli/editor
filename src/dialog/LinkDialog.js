import Dialog from '../editor/Dialog.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * Initializes a new editor link dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     */
    constructor(editor, save) {
        super(editor, save);
        this.html = `
            <legend>${this.editor.i18n('Link')}</legend>
            <div data-attr="href">
                <label for="editor-href">${this.editor.i18n('URL')}</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.editor.i18n('Insert URL to add a link or leave empty to unlink')}" />
            </div>
        `;
    }
}
