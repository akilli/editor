import Dialog from '../base/Dialog.js';
import Time from './Time.js';

/**
 * Time Dialog
 */
export default class TimeDialog extends Dialog {
    /**
     * Initializes a new time dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Time.name);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Data')).addTextInput('datetime', this._('Machine-readable Datetime'), {
            placeholder: this._('Insert date/time or leave empty to remove it'),
        });
    }
}
