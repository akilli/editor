import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class ListListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertli', this);
        this.editor.root.addEventListener('deleteli', this);
        this.editor.root.addEventListener('insertol', this);
        this.editor.root.addEventListener('insertul', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.LI)).forEach((item) => this.#init(item));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLLIElement} event.detail.element
     * @return {void}
     */
    insertli({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * Removes parent element too if deleted listitem was the only child
     *
     * @param {HTMLOListElement|HTMLUListElement} target
     * @return {void}
     */
    deleteli({ detail: { target } }) {
        if (target.children.length === 0) {
            target.parentElement.removeChild(target);
        }
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLOListElement} event.detail.element
     * @return {void}
     */
    insertol({ detail: { element } }) {
        this.#insert(element);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLUListElement} event.detail.element
     * @return {void}
     */
    insertul({ detail: { element } }) {
        this.#insert(element);
    }

    /**
     * Initializes listitem elements
     *
     * @param {HTMLLIElement} element
     * @return {void}
     */
    #init(element) {
        if (
            !(element.parentElement instanceof HTMLOListElement) &&
            !(element.parentElement instanceof HTMLUListElement)
        ) {
            this.editor.dom.wrap(element, TagName.UL);
        }
    }

    /**
     * Initializes list elements
     *
     * @param {HTMLOListElement|HTMLUListElement} element
     * @return {void}
     */
    #insert(element) {
        if (element.children.length === 0) {
            this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.LI), element);
        }
    }
}
