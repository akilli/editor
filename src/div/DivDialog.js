import Dialog from '../base/Dialog.js';

/**
 * Div Dialog
 */
export default class DivDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'div');
    }

    /**
     * @inheritDoc
     */
    getFieldsetHtml() {
        return `
            <legend>${this.translator.get('Division')}</legend>
            <div class="editor-required">
                <label for="editor-css">${this.translator.get('CSS class')}</label>
                <input id="editor-css" name="css" type="text" placeholder="${this.translator.get('Insert CSS class')}" required />
            </div>
        `;
    }
}
