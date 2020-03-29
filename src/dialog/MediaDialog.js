import Dialog from '../editor/Dialog.js';

/**
 * Media Dialog
 */
export default class MediaDialog extends Dialog {
    /**
     * Initializes a new editor media dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     */
    constructor(editor, save) {
        super(editor, save);
        this.html = `
            <legend>${this.editor.i18n('Media element')}</legend>
            <div data-attr="src">
                <label for="editor-src">${this.editor.i18n('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.editor.i18n('Insert URL to media element')}" />
            </div>
            <div data-attr="alt">
                <label for="editor-alt">${this.editor.i18n('Alternative text')}</label>
                <input id="editor-alt" name="alt" type="text" placeholder="${this.editor.i18n('Replacement text for use when media elements are not available')}" />
            </div>
            <div data-attr="width">
                <label for="editor-width">${this.editor.i18n('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div data-attr="height">
                <label for="editor-height">${this.editor.i18n('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
