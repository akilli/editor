import Dialog from '../base/Dialog.js';

export default class DefinitionDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Definition')).addTextInput('title', this._('Term'), {
            placeholder: this._('Insert term or leave empty to remove it'),
        });
    }
}
