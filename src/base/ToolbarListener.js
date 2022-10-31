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
    insertbutton({ detail: { element } }) {
        if (element.getAttribute('data-command')) {
            element.addEventListener('click', this);
        }

        element.tabIndex = element === this.editor.toolbar.firstElementChild ? 0 : -1;
        element.addEventListener('keydown', this);
    }
}
