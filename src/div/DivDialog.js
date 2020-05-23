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
            <legend>${this.t('Division')}</legend>
            <div>
                <label for="editor-class">${this.t('CSS class')}</label>
                <input id="editor-class" name="class" type="text" placeholder="${this.t('Insert CSS class')}" />
            </div>
        `;
    }
}
