import Dialog from '../editor/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * Initializes a new editor media dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     */
    constructor(editor, save) {
        super(editor, save);
        this.html = `
            <legend>${this.editor.t('Audio')}</legend>
            <div data-attr="src">
                <label for="editor-src">${this.editor.t('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.editor.t('Insert URL to media element')}" />
            </div>
            <div data-attr="width">
                <label for="editor-width">${this.editor.t('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div data-attr="height">
                <label for="editor-height">${this.editor.t('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
