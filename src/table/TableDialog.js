import Dialog from '../base/Dialog.js';
import Table from './Table.js';

export default class TableDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Table.name);
    }

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
