import Listener from './Listener.js';

/**
 * Editable Listener
 */
export default class EditableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this._editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        if (event.detail.element.contentEditable === 'true') {
            event.detail.element.addEventListener('keydown', this);
        }
    }

    /**
     * Handles enter and backspace keydown events
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (this._editor.isKey(event, 'Enter', {shift: true}) && !this._editor.tags.allowed(event.target, 'br')) {
            event.preventDefault();
            event.stopPropagation();
        } else if (this._editor.isKey(event, 'Enter')) {
            event.preventDefault();
            event.stopPropagation();
            const enter = this._editor.tags.get(event.target)?.enter;

            if (enter) {
                if (event.target.textContent.trim() || !event.target.hasAttribute('data-deletable')) {
                    this._editor.closest(event.target, enter)?.insertAdjacentElement('afterend', this._editor.createElement(enter));
                } else if (!(event.target instanceof HTMLParagraphElement)) {
                    this._editor.closest(event.target, 'p')?.insertAdjacentElement('afterend', this._editor.createElement('p'));
                    event.target.parentElement.removeChild(event.target);
                }
            }
        } else if (this._editor.isKey(event, 'Backspace') && !event.target.textContent && event.target.hasAttribute('data-deletable')) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this._editor.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        } else if (/^[A-Z]$/.test(event.key) && this._editor.isKey(event, event.key, {alt: true, shift: true})) {
            event.preventDefault();
            event.stopPropagation();
            this._editor.formats.querySelector(`button[data-key=${event.key.toLowerCase()}]`)?.click();
        }
    }
}
