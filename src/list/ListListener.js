import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

/**
 * Handles list elements
 */
export default class ListListener extends Listener {
    /**
     * @inheritDoc
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
     * Initializes list item elements when editor html is set
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.LI)).forEach((item) => this.#init(item));
    }

    /**
     * Initializes listitem elements
     *
     * @param {HTMLLIElement} element
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
     * Initializes orderedlist elements
     *
     * @param {HTMLOListElement} element
     * @return {void}
     */
    insertol({ detail: { element } }) {
        this.#insert(element);
    }

    /**
     * Initializes unorderedlist elements
     *
     * @param {HTMLUListElement} element
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
