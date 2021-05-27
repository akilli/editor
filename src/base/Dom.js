import Editor from './Editor.js';

/**
 * DOM Manager
 */
export default class Dom {
    /**
     * Editor
     *
     * @type {Editor}
     */
    #editor;

    /**
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * Correspondig DOM Document
     *
     * @type {Document}
     */
    #document;

    /**
     * Allows read access to correspondig DOM Document
     *
     * @return {Document}
     */
    get document() {
        return this.#document;
    }

    /**
     * Corresponding Window object
     *
     * @type {Window}
     */
    #window;

    /**
     * Allows read access to corresponding Window object
     *
     * @return {Window}
     */
    get window() {
        return this.#window;
    }

    /**
     * Browser window configuration
     *
     * @type {Object.<string, string>}
     */
    #browser = {
        alwaysRaised: 'yes',
        dependent: 'yes',
        height: '',
        location: 'no',
        menubar: 'no',
        minimizable: 'no',
        modal: 'yes',
        resizable: 'yes',
        scrollbars: 'yes',
        toolbar: 'no',
        width: '',
    };

    /**
     * Initializes a new DOM manager
     *
     * @param {Editor} editor
     * @param {Document} document
     */
    constructor(editor, document) {
        if (!(editor instanceof Editor) || !(document instanceof Document)) {
            throw 'Invalid argument';
        }

        this.#editor = editor;
        this.#document = document;
        this.#window = this.document.defaultView;
    }

    /**
     * Returns current selection
     *
     * @return {Selection}
     */
    getSelection() {
        return this.window.getSelection();
    }

    /**
     * Returns first range
     *
     * @return {?Range}
     */
    getRange() {
        const sel = this.window.getSelection();

        return sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    }

    /**
     * Removes all ranges and sets first range
     *
     * @param {Range} range
     * @return {void}
     */
    setRange(range) {
        const sel = this.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /**
     * Registers custom element
     *
     * @param {string} name
     * @param {function} constructor
     * @param {?string} [parentName = null]
     * @return {void}
     */
    registerElement(name, constructor, parentName = null) {
        if (typeof this.window.customElements.get(name) === 'undefined') {
            this.window.customElements.define(name, constructor, parentName ? { extends: parentName } : null);
        }
    }

    /**
     * Creates HTML element in editor document
     *
     * @param {string} name
     * @param {Object.<string, string>} [attributes = {}]
     * @param {string} [html = '']
     * @return {HTMLElement}
     */
    createElement(name, { attributes = {}, html = '' } = {}) {
        const element = this.document.createElement(name);
        element.innerHTML = html;
        Object.entries(attributes).forEach(([key, val]) => val && element.setAttribute(key, `${val}`));

        return element;
    }

    /**
     * Inserts element
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    insert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const editable = this.getSelectedEditable();

        if (editable instanceof HTMLSlotElement && this.editor.tags.allowed(editable.parentElement, element)) {
            editable.insertAdjacentElement('beforebegin', element);
        } else if (editable) {
            this.closest(editable, element)?.insertAdjacentElement('afterend', element);

            if (editable.hasAttribute('data-deletable') && !editable.textContent.trim()) {
                editable.parentElement.removeChild(editable);
            }
        } else if (this.editor.tags.allowed(this.editor.root, element)) {
            this.editor.root.appendChild(element);
        } else {
            throw 'Invalid argument';
        }
    }

    /**
     * Inserts text
     *
     * @param {string} text
     * @return {void}
     */
    insertText(text) {
        const editable = this.getSelectedEditable();

        if (editable) {
            const range = this.getRange();
            range.deleteContents();
            range.insertNode(this.createText(text));
            range.collapse();
            editable.normalize();
        }
    }

    /**
     * Adds/removes formatting to/from selected text
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    format(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const range = this.getRange();
        const editable = this.getSelectedEditable();

        if (!range
            || range.collapsed
            || !range.toString().trim()
            || !editable
            || !this.editor.tags.allowed(editable, element)
        ) {
            return;
        }

        if (range.startContainer instanceof Text && range.startContainer.parentElement !== editable) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && range.endContainer.parentElement !== editable) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const same = Array.from(range.cloneContents().childNodes).every(
            item => item instanceof Text && !item.textContent.trim()
                || item instanceof HTMLElement && item.localName === element.localName,
        );
        range.deleteContents();

        if (same) {
            range.insertNode(this.createText(selText));
        } else {
            element.textContent = selText;
            range.insertNode(element);
        }

        editable.normalize();
    }

    /**
     * Creates text node in editor document
     *
     * @param {string} text
     * @return {Text}
     */
    createText(text) {
        return this.document.createTextNode(text);
    }

    /**
     * Indicates if element allows arbitrary amount of child elements
     *
     * @param {HTMLElement} element
     * @return {boolean}
     */
    arbitrary(element) {
        return element === this.editor.root || element?.hasAttribute('data-arbitrary');
    }

    /**
     * Indicates if given element is contained by editor content root or by a clone of it
     *
     * @param {HTMLElement} element
     * @return {boolean}
     */
    contains(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        return this.editor.root.contains(element)
            || element.closest(this.editor.root.localName)?.parentElement === null;
    }

    /**
     * Returns first ancestor of given element whose parent element allows creating given child tag name or element,
     * i.e. the returned element is the sibling element to add the new child before or after
     *
     * @param {HTMLElement} element
     * @param {string|HTMLElement} child
     * @return {?HTMLElement}
     */
    closest(element, child) {
        if (!(element instanceof HTMLElement) || !this.contains(element.parentElement)) {
            throw 'Invalid argument';
        }

        let sibling = element;
        let parent = element.parentElement;

        do {
            if (this.arbitrary(parent) && this.editor.tags.allowed(parent, child)) {
                return sibling;
            }
        } while ((sibling = parent) && (parent = parent.parentElement) && this.contains(parent));

        return null;
    }

    /**
     * Wraps element with given parent if necessary and allowed
     *
     * @param {HTMLElement} element
     * @param {string} name
     * @param {Object} [opts = {}]
     * @return {void}
     */
    wrap(element, name, opts = {}) {
        let sibling;

        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        } else if (element.parentElement.localName !== name && (sibling = this.editor.dom.closest(element, name))) {
            const target = this.createElement(name, opts);
            sibling.insertAdjacentElement('afterend', target);
            target.appendChild(element);
        }
    }

    /**
     * Returns current selected element
     *
     * @return {?HTMLElement}
     */
    getSelectedElement() {
        const sel = this.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        if (anc instanceof HTMLElement && foc instanceof HTMLElement && anc === foc && this.contains(anc)) {
            return anc;
        }

        return null;
    }

    /**
     * Returns current selected contenteditable
     *
     * @return {?HTMLElement}
     */
    getSelectedEditable() {
        const sel = this.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        if (anc instanceof HTMLElement && foc instanceof HTMLElement) {
            const ancEdit = anc.closest('[contenteditable=true]');
            const focEdit = foc.closest('[contenteditable=true]');

            if (ancEdit instanceof HTMLElement && ancEdit === focEdit && this.contains(ancEdit)) {
                return ancEdit;
            }
        }

        return null;
    }

    /**
     * Focus end of contents
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    focusEnd(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        element.focus();
        const range = this.document.createRange();
        range.selectNodeContents(element);
        range.collapse();
        this.setRange(range);
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @param {string} url
     * @param {string} name
     * @param {function} call
     * @param {Object} [params = {}]
     * @return {void}
     */
    open({ url, name, call, params = {} }) {
        if (!url || typeof url !== 'string' || !name || typeof name !== 'string' || typeof call !== 'function') {
            throw 'Invalid argument';
        }

        /** @type {HTMLAnchorElement} */
        const a = this.createElement('a', { attributes: { href: url } });
        const urlObject = new URL(a.href);
        Object.entries(params).forEach(([key, val]) => urlObject.searchParams.set(key, `${val}`));
        const win = this.window.open(urlObject.toString(), name, this.#features());
        this.window.addEventListener('message', event => {
            if (event.origin === urlObject.origin && event.source === win) {
                call(event.data);
                win.close();
            }
        }, false);
    }

    /**
     * Returns window screen width
     *
     * @return {number}
     */
    getWidth() {
        return this.window.screen.width;
    }

    /**
     * Returns window screen height
     *
     * @return {number}
     */
    getHeight() {
        return this.window.screen.height;
    }

    /**
     * Converts options to window features
     *
     * @return {string}
     */
    #features() {
        const features = Object.assign(
            {},
            this.#browser,
            { height: `${this.getHeight()}`, width: `${this.getWidth()}` },
            this.editor.config.base.browser,
        );

        return Object.entries(features).filter(([, val]) => !!val).map(([key, val]) => `${key}=${val}`).join(',');
    }
}
