import Key, { isKey } from '../base/Key.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class DetailsListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertdetails', this);
        this.editor.root.addEventListener('insertsummary', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLDetailsElement} event.detail.element
     * @return {void}
     */
    insertdetails({ detail: { element } }) {
        element.open = true;

        if (!element.querySelector(`:scope > ${TagName.SUMMARY}:first-child`)) {
            this.editor.dom.insertFirstChild(this.editor.dom.createElement(TagName.SUMMARY), element);
        }
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
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
    blur({ target }) {
        this.#empty(target);
    }

    /**
     * Fixes space and enter key handling for editable summary elements
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (isKey(event, Key.SPACE)) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.dom.insertText(' ');
        } else if (isKey(event, Key.ENTER)) {
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
            element.textContent = this._('Details');
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
