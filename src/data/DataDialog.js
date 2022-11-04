import Dialog from '../base/Dialog.js';

export default class DataDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Data')).addTextInput('value', this._('Machine-readable Value'), {
            placeholder: this._('Insert value or leave empty to remove it'),
        });
    }
}
