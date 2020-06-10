import Dialog from '../base/Dialog.js';

/**
 * Audio Dialog
 */
export default class AudioDialog extends Dialog {
    /**
     * Initializes a new audio dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'audio');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Audio')}</legend>
            <div class="editor-required">
                <label for="editor-src">${this._('URL')}</label>
                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this._('Insert URL to media element')}" required />
            </div>
            <div>
                <label for="editor-width">${this._('Width')}</label>
                <input id="editor-width" name="width" type="number" />
            </div>
            <div>
                <label for="editor-height">${this._('Height')}</label>
                <input id="editor-height" name="height" type="number" />
            </div>
        `;
    }
}
