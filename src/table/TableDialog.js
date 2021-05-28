import Dialog from '../base/Dialog.js';
import Table from './Table.js';

/**
 * Table Dialog
 */
export default class TableDialog extends Dialog {
    /**
     * Initializes a new table dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Table.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._createLegend(this._('Table')));
        fieldset.appendChild(
            this._createInput('rows', 'number', this._('Rows'), { min: '1', required: 'required', value: '1' }),
        );
        fieldset.appendChild(
            this._createInput('cols', 'number', this._('Columns'), { min: '1', required: 'required', value: '1' }),
        );
    }
}
