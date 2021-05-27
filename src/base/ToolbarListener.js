import BarListener from './BarListener.js';

/**
 * Toolbar Listener
 */
export default class ToolbarListener extends BarListener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.toolbar.addEventListener('insertbutton', this);
    }
}
