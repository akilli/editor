import BarListener from './BarListener.js';

/**
 * Focusbar Listener
 */
export default class FocusbarListener extends BarListener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.focusbar.addEventListener('insertbutton', this);
        this.editor.root.addEventListener('focusin', this);
        this.editor.root.addEventListener('focusout', this);
    }

    /**
     * @inheritDoc
     */
    insertbutton(event) {
        super.insertbutton(event);

        if (event.detail.element.getAttribute('data-command')) {
            event.detail.element.addEventListener('mousedown', this);
        }
    }

    /**
     * Handles mousedown events
     *
     * @param {MouseEvent} event
     * @return {void}
     */
    mousedown(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Hides the focusbar
     *
     * @param {FocusEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    focusin(event) {
        this.editor.focusbar.hidden = false;
        const top = event.target.offsetTop + event.target.offsetParent.offsetTop - this.editor.focusbar.clientHeight;
        this.editor.focusbar.style.top = `${top}px`;
    }

    /**
     * Shows the focusbar
     *
     * @param {FocusEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    focusout(event) {
        this.editor.focusbar.hidden = true;
        this.editor.focusbar.removeAttribute('style');
    }
}
