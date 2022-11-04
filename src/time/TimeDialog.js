import Dialog from '../base/Dialog.js';

export default class TimeDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Data')).addTextInput('datetime', this._('Machine-readable Datetime'), {
            placeholder: this._('Insert date/time or leave empty to remove it'),
        });
    }
}
