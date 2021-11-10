import BarListener from './BarListener.js';
import { TagGroup } from './enum.js';

/**
 * Formatbar Listener
 */
export default class FormatbarListener extends BarListener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.formatbar.addEventListener('insertbutton', this);
        this.editor.dom.document.addEventListener('selectionchange', this);
    }

    /**
     * Shows or hides formatbar depending on current selection
     *
     * @return {void}
     */
    selectionchange() {
        const editable = this.editor.dom.getSelectedEditable();

        if (editable
            && !this.editor.dom.getSelection().isCollapsed
            && this.editor.tags.allowed(editable, TagGroup.FORMAT, true)
        ) {
            this._show(this.editor.formatbar, editable);
        } else {
            this._hide(this.editor.formatbar);
        }
    }
}
