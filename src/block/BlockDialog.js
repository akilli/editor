import Block from './Block.js';
import Dialog from '../base/Dialog.js';

/**
 * Block Dialog
 */
export default class BlockDialog extends Dialog {
    /**
     * Initializes a new block dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Block.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._createLegend(this._('Block')));
        fieldset.appendChild(this._createInput('id', 'text', this._('ID'), { required: 'required' }));
    }
}
