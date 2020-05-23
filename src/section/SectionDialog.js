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
            <legend>${this.t('Section')}</legend>
            <div>
                <label for="editor-class">${this.t('CSS class')}</label>
                <input id="editor-class" name="class" type="text" placeholder="${this.t('Insert CSS class')}" />
            </div>
        `;
    }
}
