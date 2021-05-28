import Abbreviation from './Abbreviation.js';
import Dialog from '../base/Dialog.js';

/**
 * Abbreviation Dialog
 */
export default class AbbreviationDialog extends Dialog {
    /**
     * Initializes a new abbreviation dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Abbreviation.name);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.creator
            .addLegend(this._('Abbreviation'))
            .addTextInput('title', this._('Full term'), {
                placeholder: this._('Insert full term or leave empty to remove it'),
            });
    }
}
