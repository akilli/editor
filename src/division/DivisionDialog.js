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
    _prepareForm() {
        this.creator
            .addLegend(this._('Division'))
            .addTextInput('class', this._('CSS class'), { placeholder: this._('Insert CSS class') });
    }
}
