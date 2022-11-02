import Block from './Block.js';
import Dialog from '../base/Dialog.js';

export default class BlockDialog extends Dialog {
    /**
     * @param {Editor} editor
     * @param {string|undefined} browserUrl
     */
    constructor(editor, browserUrl = undefined) {
        super(editor, Block.name, browserUrl);
    }

    /**
     * @protected
     * @return {void}
     */
    _prepareForm() {
        this.formCreator.addLegend(this._('Block')).addTextInput('id', this._('ID'), { required: 'required' });
    }
}
