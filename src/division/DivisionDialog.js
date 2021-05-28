import Dialog from '../base/Dialog.js';
import Division from './Division.js';

/**
 * Division Dialog
 */
export default class DivisionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Division.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._createLegend(this._('Division')));
        fieldset.appendChild(
            this._createInput('class', 'text', this._('CSS class'), { placeholder: this._('Insert CSS class') }),
        );
    }
}
