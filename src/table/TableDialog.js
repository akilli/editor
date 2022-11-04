import Dialog from '../base/Dialog.js';

export default class TableDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Table'))
            .addNumberInput('rows', this._('Rows'), { min: '1', required: 'required', value: '1' })
            .addNumberInput('cols', this._('Columns'), { min: '1', required: 'required', value: '1' });
    }
}
