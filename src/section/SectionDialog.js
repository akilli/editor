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
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Section')}</legend>
            <div class="editor-required">
                <label for="editor-css">${this.translator.get('CSS class')}</label>
                <input id="editor-css" name="css" type="text" placeholder="${this.translator.get('Insert CSS class')}" required />
            </div>
        `;
    }
}
