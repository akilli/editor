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
    _getHtml() {
        return `
            <legend>${this._('Link')}</legend>
            <div>
                <label for="editor-href">${this._('URL')}</label>
                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this._('Insert URL to add a link or leave empty to unlink')}" />
            </div>
        `;
    }
}
