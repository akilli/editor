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
        this.editor.content.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        if (event.detail.element.isContentEditable) {
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
        if (this.editor.isKey(event, 'Enter', {shift: true}) && !this.editor.tags.isAllowed('br', event.target)) {
            event.preventDefault();
            event.stopPropagation();
        } else if (this.editor.isKey(event, 'Enter')) {
            event.preventDefault();
            event.stopPropagation();
            let enter = this.editor.tags.get(event.target)?.enter;

            if (enter) {
                if (event.target.textContent.trim() || !event.target.hasAttribute('data-deletable')) {
                    this.editor.closest(event.target, enter);
                } else if (!(event.target instanceof HTMLParagraphElement)) {
                    this.editor.closest(event.target, 'p');
                    event.target.parentElement.removeChild(event.target);
                }
            }
        } else if (this.editor.isKey(event, 'Backspace') && !event.target.textContent && event.target.hasAttribute('data-deletable')) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this.editor.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
