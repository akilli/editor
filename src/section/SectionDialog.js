import Dialog from '../base/Dialog.js';

export default class SectionDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator
            .addLegend(this._('Section'))
            .addTextInput('class', this._('CSS class'), { placeholder: this._('Insert CSS class') });
    }
}
