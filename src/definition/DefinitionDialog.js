import Definition from './Definition.js';
import Dialog from '../base/Dialog.js';

export default class DefinitionDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Definition.name);
    }

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
