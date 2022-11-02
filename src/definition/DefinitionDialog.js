import Definition from './Definition.js';
import Dialog from '../base/Dialog.js';

/**
 * Definition Dialog
 */
export default class DefinitionDialog extends Dialog {
    /**
     * Initializes a new definition dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Definition.name);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Definition')).addTextInput('title', this._('Term'), {
            placeholder: this._('Insert term or leave empty to remove it'),
        });
    }
}
