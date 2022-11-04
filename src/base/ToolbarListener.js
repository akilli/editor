import BarListener from './BarListener.js';

export default class ToolbarListener extends BarListener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.toolbar.addEventListener('insertbutton', this);
    }
}
