import Dialog from '../base/Dialog.js';

export default class BlockDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Block')).addTextInput('id', this._('ID'), { required: 'required' });
    }
}
