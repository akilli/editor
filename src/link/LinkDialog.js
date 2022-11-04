import Dialog from '../base/Dialog.js';

export default class LinkDialog extends Dialog {
    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Link')).addTextInput('href', this._('URL'), {
            pattern: '(https?|/|mailto:|tel:).+',
            placeholder: this._('Insert link or leave empty to unlink'),
        });
    }
}
