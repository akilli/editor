import Dialog from '../base/Dialog.js';

export default class DetailsDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Details')).addTextInput('name', this._('Name'), {
            placeholder: this._('Insert name or leave empty to remove it'),
        });
    }
}
