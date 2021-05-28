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
     * @param {string|undefined} url
     */
    constructor(editor, url = undefined) {
        super(editor, Block.name, url);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.creator
            .addLegend(this._('Block'))
            .addTextInput('id', this._('ID'), { required: 'required' });
    }
}
