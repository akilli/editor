import Key from '../base/Key.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

/**
 * Handles details elements
 */
export default class DetailsListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertdetails', this);
        this.editor.root.addEventListener('insertsummary', this);
    }

    /**
     * Initializes details elements
     *
     * @param {HTMLDetailsElement} element
     * @return {void}
     */
    insertdetails({ detail: { element } }) {
        element.open = true;

        if (!element.querySelector(`:scope > ${TagName.SUMMARY}:first-child`)) {
            this.editor.dom.insertFirstChild(this.editor.dom.createElement(TagName.SUMMARY), element);
        }
    }

    /**
     * Initializes summary elements
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    insertsummary({ detail: { element } }) {
        this.#empty(element);
        element.addEventListener('click', this);
        element.addEventListener('blur', this);
        element.addEventListener('keydown', this);
    }

    /**
     * Prevents toggling details open state
     *
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    click(event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.open = true;
    }

    /**
     * Sets default summary text content if it's empty
     *
     * @param {FocusEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    blur(event) {
        this.#empty(event.target);
    }

    /**
     * Fixes space and enter key handling for editable summary elements
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (Key.isEventFor(event, Key.SPACE)) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.dom.insertText(' ');
        } else if (Key.isEventFor(event, Key.ENTER)) {
            event.preventDefault();
            event.stopPropagation();
            event.target.parentElement.open = true;
        }
    }

    /**
     * Ensures summary element is not empty to avoid strange browser behaviour
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    #empty(element) {
        if (!element.textContent.trim()) {
            element.textContent = this.editor.translate('Details');
        } else {
            element
                .querySelectorAll(TagName.BR + ':not(:last-child)')
                .forEach((item) => item.parentElement.removeChild(item));
        }

        if (!(element.lastElementChild instanceof HTMLBRElement)) {
            this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.BR), element);
        }
    }
}
