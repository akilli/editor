import Block from './Block.js';
import Dialog from '../base/Dialog.js';

export default class BlockDialog extends Dialog {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Block.name, editor.config.block.browser);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Block')).addTextInput('id', this._('ID'), { required: 'required' });
    }
}
