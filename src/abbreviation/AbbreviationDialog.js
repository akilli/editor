import Abbreviation from './Abbreviation.js';
import Dialog from '../base/Dialog.js';

export default class AbbreviationDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Abbreviation.name);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Abbreviation')).addTextInput('title', this._('Full term'), {
            placeholder: this._('Insert full term or leave empty to remove it'),
        });
    }
}
