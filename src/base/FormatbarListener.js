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
            const top = editable.offsetTop + editable.offsetParent.offsetTop - this.editor.formatbar.clientHeight;
            this.editor.formatbar.style.top = `${top}px`;
            this.editor.formatbar.hidden = false;
        } else {
            this.editor.formatbar.hidden = true;
            this.editor.formatbar.removeAttribute('style');
        }
    }
}
