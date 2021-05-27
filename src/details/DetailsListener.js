import Details from './Details.js';
import Listener from '../base/Listener.js';
import { Key } from '../base/enum.js';
import { isKey } from '../base/util.js';

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
     * @param {CustomEvent} event
     * @param {HTMLDetailsElement} event.detail.element
     * @return {void}
     */
    insertdetails(event) {
        event.detail.element.open = true;

        if (!event.detail.element.querySelector(':scope > summary:first-child')) {
            event.detail.element.insertAdjacentElement('afterbegin', this.editor.dom.createElement('summary'));
        }
    }

    /**
     * Initializes summary elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insertsummary(event) {
        this.#empty(event.detail.element);
        event.detail.element.addEventListener('blur', this);
        event.detail.element.addEventListener('keydown', this);
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
            element.textContent = this.editor.translator.translate(Details.name, 'Details');
        } else {
            element.querySelectorAll('br:not(:last-child)').forEach(item => item.parentElement.removeChild(item));
        }

        element.lastElementChild instanceof HTMLBRElement || element.appendChild(this.editor.dom.createElement('br'));
    }
}
