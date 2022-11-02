import Dialog from '../base/Dialog.js';
import Section from './Section.js';

export default class SectionDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Section.name);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Section'))
            .addTextInput('class', this._('CSS class'), { placeholder: this._('Insert CSS class') });
    }
}
