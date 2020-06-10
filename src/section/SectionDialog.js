import Dialog from '../base/Dialog.js';

/**
 * Section Dialog
 */
export default class SectionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'section');
    }

    /**
     * @inheritDoc
     */
    _getHtml() {
        return `
            <legend>${this._('Section')}</legend>
            <div>
                <label for="editor-class">${this._('CSS class')}</label>
                <input id="editor-class" name="class" type="text" placeholder="${this._('Insert CSS class')}" />
            </div>
        `;
    }
}
