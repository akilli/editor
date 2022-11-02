import BarListener from './BarListener.js';

export default class ToolbarListener extends BarListener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.toolbar.addEventListener('insertbutton', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLButtonElement} event.detail.element
     * @return {void}
     */
    insertbutton({ detail: { element } }) {
        if (element.getAttribute('data-command')) {
            element.addEventListener('click', this);
        }

        element.tabIndex = element === this.editor.toolbar.firstElementChild ? 0 : -1;
        element.addEventListener('keydown', this);
    }
}
