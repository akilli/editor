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

    /**
     * @inheritDoc
     */
    insertbutton(event) {
        super.insertbutton(event);
        event.detail.element.tabIndex = -1;
        event.detail.element.addEventListener('keydown', this);
    }
}
