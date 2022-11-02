import Dialog from '../base/Dialog.js';
import Division from './Division.js';

export default class DivisionDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Division.name);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Division'))
            .addTextInput('class', this._('CSS class'), { placeholder: this._('Insert CSS class') });
    }
}
