import Listener from '../base/Listener.js';

/**
 * Handles summary elements
 */
export default class SummaryListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertsummary', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insertsummary(event) {
        this.__empty(event.detail.element);
        event.detail.element.addEventListener('blur', this);
        event.detail.element.addEventListener('keydown', this);
    }

    /**
     * Sets default summary text content if it's empty
     *
     * @param {FocusEvent} event
     * @param {HTMLElement} event.target
     */
    blur(event) {
        this.__empty(event.target);
    }

    /**
     * Fixes space and enter key handling for editable summary elements
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (this.editor.isKey(event, ' ')) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.insertText(' ');
        } else if (this.editor.isKey(event, 'Enter')) {
            event.preventDefault();
            event.stopPropagation();
            event.target.parentElement.open = true;
        }
    }

    /**
     * Ensures summary element is not empty to avoid strange browser behaviour
     *
     * @private
     * @param {HTMLElement} element
     */
    __empty(element) {
        if (!element.textContent.trim()) {
            element.textContent = this.editor.translator.translate('details', 'Details');
        } else {
            element.querySelectorAll('br:not(:last-child)').forEach(item => item.parentElement.removeChild(item));
        }

        element.lastElementChild instanceof HTMLBRElement || element.appendChild(this.editor.createElement('br'));
    }
}
