import Command from './command/Command.js';
import Converter from './converter/Converter.js';
import Tag from './tag/Tag.js';
import TextCommand from './command/TextCommand.js';
import configCommand from '../cfg/command.js';
import configConverter from '../cfg/converter.js';
import configTag from '../cfg/tag.js';

/**
 * Editor
 */
export default class Editor {
    /**
     * Creates a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} config
     */
    constructor(element, config = {}) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid element';
        }

        /**
         * Correspondig DOM Document
         *
         * @type {Document}
         * @readonly
         */
        this.document = element.ownerDocument;

        /**
         * Corresponding Window object
         *
         * @type {Window}
         * @readonly
         */
        this.window = element.ownerDocument.defaultView;

        /**
         * Corresponding DOM element of the editor
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.element = this.createElement(element);

        /**
         * Configuration
         *
         * @typedef {Object} Config
         * @property {String} gui          URL path to editor root directory
         * @property {String} mediabrowser Media browser URL
         *
         * @type {Config}
         * @readonly
         */
        this.config = config;

        /**
         * Tags
         *
         * @type {Map<String, Tag>}
         * @readonly
         */
        this.tags = this.createTags(configTag);

        /**
         * Element converters
         *
         * @type {Map<String, Converter>}
         * @readonly
         */
        this.converters = this.createConverters(configConverter);

        /**
         * Commands
         *
         * @type {Map<String, Command>}
         */
        this.commands = this.createCommands(configCommand);

        /**
         * Corresponding DOM element of the widget toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbarWidget = this.createToolbar('widget');

        /**
         * Corresponding DOM element of the editable's toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbarEditable = this.createToolbar('editable');

        /**
         * Dialog DOM element
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.dialog = this.createDialog();
    }

    /**
     * Creates editor element if necessary
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement}
     */
    createElement(element) {
        if (element instanceof HTMLTextAreaElement) {
            const textarea = element;
            element = this.document.createElement('div');
            element.innerHTML = textarea.value.replace('/&nbsp;/g', ' ');
            textarea.parentElement.insertBefore(element, textarea);
            textarea.setAttribute('hidden', 'hidden');
            textarea.form.addEventListener('submit', () => {
                textarea.value = this.getData();
            });
        }

        element.classList.add('editor');

        return element;
    }

    /**
     * Creates tags map
     *
     * @param {Object[]} config
     *
     * @return {Map<String, Tag>}
     */
    createTags(config) {
        const map = new Map();

        config.forEach(item => {
            const tag = new Tag(item);
            return map.set(tag.name, tag);
        });

        return map;
    }

    /**
     * Creates converters map
     *
     * @param {Object.<String, Converter>} config
     *
     * @return {Map<String, Converter>}
     */
    createConverters(config) {
        const map = new Map();

        Object.getOwnPropertyNames(config).forEach(key => {
            if (!(config[key] instanceof Converter)) {
                throw 'Invalid converter';
            }

            map.set(key, config[key]);
        });

        return map;
    }

    /**
     * Creates commands map
     *
     * @param {Object.<String, Function>} config
     *
     * @return {Map<String, Command>}
     */
    createCommands(config) {
        const map = new Map();

        Object.getOwnPropertyNames(config).forEach(key => {
            let command;

            if (typeof config[key] !== 'function' || !(command = config[key](this)) || !(command instanceof Command)) {
                throw 'Invalid command';
            }

            return map.set(key, command);
        });

        return map;
    }

    /**
     * Creates a toolbar with given name
     *
     * @param {String} name
     *
     * @return {HTMLElement}
     */
    createToolbar(name) {
        if (!name || typeof name !== 'string') {
            throw 'Invalid toolbar name';
        }

        const toolbar = this.document.createElement('div');

        toolbar.classList.add('editor-toolbar');
        toolbar.classList.add('editor-toolbar-' + name);
        this.element.parentElement.insertBefore(toolbar, this.element);

        return toolbar;
    }

    /**
     * Creates editor dialog
     *
     * @return {HTMLElement}
     */
    createDialog() {
        const dialog = this.document.createElement('dialog');

        dialog.classList.add('editor-dialog');
        dialog.addEventListener('click', ev => {
            if (ev.target === dialog) {
                dialog.removeAttribute('open');
            }
        });
        this.element.parentElement.appendChild(dialog);

        return dialog;
    }

    /**
     * Init editor
     */
    init() {
        this.initElement();
        this.initEditable();
        this.initDraggable();
        this.initGui();
        this.initToolbar();
    }

    /**
     * Init editor element
     */
    initElement() {
        this.filter(this.element);
        this.element.addEventListener('selectstart', () => {
            const active = this.document.activeElement;

            if (active.contentEditable && this.allowedGroup('text', active.tagName)) {
                this.toolbarEditable.style.display = 'block';
                this.toolbarEditable.style.top = (active.offsetTop + active.offsetParent.offsetTop - this.toolbarEditable.clientHeight) + 'px';
            }
        });
        this.document.addEventListener('selectionchange', () => {
            const active = this.document.activeElement;

            if (this.window.getSelection().isCollapsed || !active.contentEditable || !this.element.contains(active)) {
                this.toolbarEditable.removeAttribute('style');
            }
        });
    }

    /**
     * Init editable elements
     */
    initEditable() {
        const editables = [...this.tags].reduce((result, item) => {
            if (item[1].editable) {
                result.push(item[1].name);
            }

            return result;
        }, []);
        const selector = editables.join(', ');
        const editableCallback = node => {
            node.contentEditable = true;
            node.focus();
            node.addEventListener('keydown', ev => {
                if (ev.key === 'Enter' && (!ev.shiftKey || !this.allowed('br', node.tagName))) {
                    ev.preventDefault();
                    ev.cancelBubble = true;
                }
            });
            node.addEventListener('keyup', ev => {
                let tag;

                if (ev.key === 'Enter' && !ev.shiftKey && (tag = this.getTag(node.tagName)) && !!tag.enter) {
                    let current = node;
                    let parentName;

                    ev.preventDefault();
                    ev.cancelBubble = true;

                    do {
                        parentName = this.getTagName(current.parentElement);

                        if (this.allowed(tag.enter, parentName)) {
                            const newElement = this.document.createElement(tag.enter);
                            this.insert(newElement, current);
                            break;
                        }
                    } while (!!(current = current.parentElement) && this.element.contains(current) && !this.element.isSameNode(current));
                }
            });
        };

        this.element.querySelectorAll(selector).forEach(editableCallback);
        this.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement && editables.includes(node.tagName.toLowerCase())) {
                        editableCallback(node);
                    } else if (node instanceof HTMLElement) {
                        node.querySelectorAll(selector).forEach(editableCallback)
                    }
                });
            });
        });
    }

    /**
     * Init draggable elements
     */
    initDraggable() {
        const disableDragCallback = node => {
            if (node instanceof HTMLAnchorElement && node instanceof HTMLImageElement) {
                node.draggable = false;
                node.addEventListener('dragstart', ev => ev.preventDefault());
            }
        };
        const draggableCallback = node => {
            if (node instanceof HTMLElement && this.element.isSameNode(node.parentElement)) {
                const parentName = 'root';
                const keyName = 'text/x-editor-name';
                const keyHtml = 'text/x-editor-html';
                const toggle = () => {
                    const isDraggable = node.hasAttribute('draggable');

                    this.element.querySelectorAll('[draggable]').forEach(item => {
                        item.removeAttribute('draggable');

                        if (item.hasAttribute('contenteditable')) {
                            item.setAttribute('contenteditable', 'true');
                        }
                    });

                    if (!isDraggable) {
                        node.setAttribute('draggable', 'true');

                        if (node.hasAttribute('contenteditable')) {
                            node.setAttribute('contenteditable', 'false');
                        }
                    }
                };
                const removeClass = () => {
                    node.classList.remove('dragover');

                    if (node.classList.length <= 0) {
                        node.removeAttribute('class');
                    }
                };
                const allowDrop = ev => {
                    const name = ev.dataTransfer.getData(keyName);

                    if (name && this.allowed(name, parentName)) {
                        ev.preventDefault();
                        node.classList.add('dragover');
                        ev.dataTransfer.dropEffect = 'move';
                    }
                };

                node.addEventListener('dblclick', toggle);
                node.addEventListener('dragstart', ev => {
                    ev.dataTransfer.effectAllowed = 'move';
                    ev.dataTransfer.setData(keyName, node.tagName.toLowerCase());
                    ev.dataTransfer.setData(keyHtml, node.outerHTML);
                });
                node.addEventListener('dragend', ev => {
                    if (ev.dataTransfer.dropEffect === 'move') {
                        node.parentElement.removeChild(node);
                    }

                    toggle();
                });
                node.addEventListener('dragenter', allowDrop);
                node.addEventListener('dragover', allowDrop);
                node.addEventListener('dragleave', removeClass);
                node.addEventListener('drop', ev => {
                    const name = ev.dataTransfer.getData(keyName);
                    const html = ev.dataTransfer.getData(keyHtml);

                    ev.preventDefault();
                    removeClass();

                    if (name && this.allowed(name, parentName) && html) {
                        node.insertAdjacentHTML('beforebegin', html);
                    }
                });
            }
        };

        this.document.querySelectorAll('a, img').forEach(disableDragCallback);
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(disableDragCallback)));

        Array.from(this.element.children).forEach(draggableCallback);
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(draggableCallback)));
    }

    /**
     * Init GUI
     */
    initGui() {
        const css = this.document.styleSheets;
        const link = this.document.createElement('link');

        link.rel = 'stylesheet';
        link.href = this.gui('editor.css');

        for (let i = 0; i < css.length; ++i) {
            if (css[i].href === link.href) {
                return;
            }
        }

        this.document.head.appendChild(link);
    }

    /**
     * Init Toolbar
     */
    initToolbar() {
        for (let item of this.commands.entries()) {
            const img = this.document.createElement('img');

            img.setAttribute('src', this.gui('command/' + item[0] + '.svg'));
            img.setAttribute('alt', item[0]);
            img.setAttribute('title', item[0]);
            img.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.element, true)) {
                    this.element.focus();
                }

                item[1].execute();
            });

            if (item[1] instanceof TextCommand) {
                this.toolbarEditable.appendChild(img);
            } else {
                this.toolbarWidget.appendChild(img);
            }
        }
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {Function} callback
     * @param {Object} config
     */
    register(callback, config = {childList: true, subtree: true}) {
        if (typeof callback !== 'function') {
            throw 'Invalid observer';
        }

        const mutation = new MutationObserver(callback);
        mutation.observe(this.element, config);
    }

    /**
     * Execute command
     *
     * @param {String} name
     */
    execute(name) {
        const command = this.commands.get(name);

        if (!command) {
            throw 'Invalid command';
        }

        command.execute();
    }

    /**
     * Returns editor element's innerHTML
     *
     * @return {String}
     */
    getData() {
        const element = this.document.createElement(this.element.tagName);
        element.innerHTML = this.element.innerHTML;
        this.filter(element, true);

        return element.innerHTML;
    }

    /**
     * Inserts an element at the editor element or optionally after given reference element
     *
     * @param {HTMLElement} element
     * @param {?HTMLElement} ref
     */
    insert(element, ref) {
        if (!(element instanceof HTMLElement) || ref && !(ref instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const parent = ref ? ref.parentElement : this.element;
        const parentName = this.getTagName(parent);

        if (!this.element.contains(parent) || !this.allowed(element.tagName, parentName)) {
            throw 'Element is not allowed here';
        }

        parent.insertBefore(element, ref ? ref.nextElementSibling : null)
    }

    /**
     * Insert text
     *
     * @param {String} text
     */
    insertText(text) {
        this.document.execCommand('inserttext', false, text);
    }

    /**
     * Adds or removes formatting to/from selected text
     *
     * @param {HTMLElement} element
     */
    formatText(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const sel = this.window.getSelection();
        const anc = sel.anchorNode;
        const foc = sel.focusNode;

        if (sel.isCollapsed || !sel.toString().trim() || !this.isTextOrHtml(anc)) {
            return;
        }

        const ancEl = anc instanceof Text ? anc.parentElement : anc;
        const focEl = foc instanceof Text ? foc.parentElement : foc;
        const ancEdit = ancEl.closest('[contenteditable=true]');
        const focEdit = focEl.closest('[contenteditable=true]');

        if (!ancEdit || !focEdit || !ancEdit.isSameNode(focEdit)) {
            return;
        }

        const range = sel.getRangeAt(0);
        const tag = this.getTag(ancEl.tagName);
        const parent = !tag || tag.group === 'text' ? ancEl.parentElement : ancEl;

        if (range.startContainer instanceof Text && !range.startContainer.parentElement.isSameNode(parent)) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && !range.endContainer.parentElement.isSameNode(parent)) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        let same = Array.from(selNodes).every(item => {
            return this.isTextOrHtml(item) && item instanceof Text && !item.nodeValue.trim() || item instanceof HTMLElement && item.tagName === element.tagName;
        });

        range.deleteContents();

        if (parent.contentEditable && this.allowed(element.tagName, parent.tagName) && selText.trim() && (!tag || !same)) {
            element.innerText = selText;
            range.insertNode(element);
        } else {
            range.insertNode(this.document.createTextNode(selText));
        }

        parent.normalize();
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} parent
     * @param {Boolean} forceRoot
     */
    filter(parent, forceRoot = false) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const isRoot = forceRoot || this.element.isSameNode(parent);
        const parentName = forceRoot ? 'root' : this.getTagName(parent);
        let br;

        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (!this.isTextOrHtml(node)) {
                parent.removeChild(node);
                return;
            }

            node = this.convert(node);
            const isHtml = node instanceof HTMLElement;
            const name = isHtml ? node.tagName : null;
            const tag = isHtml ? this.getTag(name) : null;

            if (tag && (this.allowed(name, parentName) || isRoot && tag.group === 'text')) {
                Array.from(node.attributes).forEach(item => {
                    if (!tag.attributes.includes(item.name)) {
                        node.removeAttribute(item.name);
                    }
                });

                if (node.hasChildNodes()) {
                    this.filter(node);
                }

                if (!node.hasChildNodes() && !tag.empty) {
                    parent.removeChild(node);
                } else if (isRoot && tag.group === 'text') {
                    const p = this.document.createElement('p');
                    p.innerHTML = node.outerHTML;
                    parent.replaceChild(p, node);
                }
            } else if (isRoot && (!isHtml && !!node.nodeValue.trim() || tag && !!node.innerText.trim())) {
                const p = this.document.createElement('p');
                p.innerText = isHtml ? node.innerText.trim() : node.nodeValue.trim();
                parent.replaceChild(p, node);
            } else if (tag && !!node.innerText.trim()) {
                const text = this.document.createTextNode(node.innerText.trim());
                parent.replaceChild(text, node);
            } else if (isHtml || isRoot) {
                parent.removeChild(node);
            }
        });

        while ((br = parent.firstChild) && br instanceof HTMLBRElement || (br = parent.lastChild) && br instanceof HTMLBRElement) {
            parent.removeChild(br);
        }
    }

    /**
     * Returns tag name from element considering execption for root element
     *
     * @param {HTMLElement} element
     *
     * @return {String}
     */
    getTagName(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        return this.element.isSameNode(element) ? 'root' : element.tagName;
    }

    /**
     * Returns tag configuration vor given tag name
     *
     * @param {String} name
     *
     * @return {?Tag}
     */
    getTag(name) {
        return this.tags.get(name.toLowerCase()) || null;
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {String} name
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowed(name, parentName) {
        const tag = this.getTag(name);
        const parentTag = this.getTag(parentName);

        return tag && parentTag && parentTag.children.includes(tag.group);
    }

    /**
     * Checks if given group is allowed inside given parent element
     *
     * @param {String} group
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowedGroup(group, parentName) {
        const parentTag = this.getTag(parentName);

        return parentTag && parentTag.children.includes(group);
    }

    /**
     * Converts element
     *
     * @param {Node} node
     *
     * @return {Node}
     */
    convert(node) {
        let converter;

        if (!(node instanceof HTMLElement) || !(converter = this.converters.get(node.tagName.toLowerCase()))) {
            return node;
        }

        const newNode = converter.convert(node);
        node.parentElement.replaceChild(newNode, node);

        return newNode;
    }

    /**
     * Indicates if given node is either a text node or a HTML element
     *
     * @param {Node} node
     *
     * @return {Boolean}
     */
    isTextOrHtml(node) {
        return node instanceof Text || node instanceof HTMLElement;
    }

    /**
     * Converts URL
     *
     * @param {String} url
     *
     * @return {String}
     */
    url(url) {
        const a = this.document.createElement('a');
        a.href = url;

        return a.origin === this.window.origin ? a.pathname : a.href;
    }

    /**
     * Returns GUI URL
     *
     * @param {String} path
     *
     * @return {String}
     */
    gui(path) {
        return this.config.gui + '/' + path;
    }

    /**
     * Factory method to create a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} config
     *
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new Editor(element, config);
        editor.init();

        return editor;
    }
}
