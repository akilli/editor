import Command from './command/Command.js';
import Converter from './converter/Converter.js';
import EditorConfig from './config/EditorConfig.js';
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
     * @param {HTMLElement} orig
     * @param {EditorConfig} config
     */
    constructor(orig, config = {}) {
        if (!(orig instanceof HTMLElement)) {
            throw 'Invalid element';
        } else if (!(config instanceof EditorConfig)) {
            throw 'Invalid configuration';
        }

        const element = orig.ownerDocument.createElement('div');
        const content = orig.ownerDocument.createElement('div');
        const toolbarWidget = orig.ownerDocument.createElement('div');
        const toolbarEditable = orig.ownerDocument.createElement('div');

        element.classList.add('editor');
        content.classList.add('editor-content');
        toolbarWidget.classList.add('editor-toolbar', 'editor-toolbar-widget');
        toolbarEditable.classList.add('editor-toolbar', 'editor-toolbar-editable');

        orig.hidden = true;
        orig.insertAdjacentElement('afterend', element);
        element.appendChild(toolbarWidget);
        element.appendChild(content);
        element.appendChild(toolbarEditable);

        /**
         * Corresponding DOM element of the source
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.orig = orig;

        /**
         * Correspondig DOM Document
         *
         * @type {Document}
         * @readonly
         */
        this.document = orig.ownerDocument;

        /**
         * Corresponding Window object
         *
         * @type {Window}
         * @readonly
         */
        this.window = this.document.defaultView;

        /**
         * Configuration
         *
         * @type {EditorConfig}
         * @readonly
         */
        this.config = config;

        /**
         * Corresponding DOM element of the editor
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.element = element;

        /**
         * Corresponding DOM element of the editor content
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.content = content;

        /**
         * Corresponding DOM element of the widget toolbar
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.toolbarWidget = toolbarWidget;

        /**
         * Corresponding DOM element of the editable toolbar
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.toolbarEditable = toolbarEditable;

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
     * Init editor
     */
    init() {
        this.initObserver();
        this.initContent();
        this.initToolbar();
    }

    /**
     * Init content
     */
    initContent() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.content.innerHTML = this.orig.value.replace('/&nbsp;/g', ' ');
            this.orig.form.addEventListener('submit', () => this.save());
        } else {
            this.content.innerHTML = this.orig.innerHTML;
        }

        this.filter(this.content);
    }

    /**
     * Init observer
     */
    initObserver() {
        // Editables
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

                if (ev.key === 'Enter' && !ev.shiftKey && (tag = this.getTag(node.tagName)) && tag.enter) {
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
                    } while ((current = current.parentElement) && this.content.contains(current) && !this.content.isSameNode(current));
                }
            });
        };

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

        // Fix space key for editable summary elements
        this.register(ev =>  ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'summary' || node instanceof HTMLDetailsElement && (node = node.querySelector('summary'))) {
                node.addEventListener('blur', () => {
                    if (!node.innerText.trim()) {
                        node.innerText = 'Details';
                    }
                });
                node.addEventListener('keydown', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                    }
                });
                node.addEventListener('keyup', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                        this.insertText(' ');
                    }
                });
            }
        })));

        // Disable dragging of anchor and image elements
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLAnchorElement || node instanceof HTMLImageElement) {
                node.draggable = false;
                node.addEventListener('dragstart', ev => ev.preventDefault());
            }
        })));

        // Drag'n'drop for widgets
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && this.content.isSameNode(node.parentElement)) {
                const parentName = 'root';
                const keyName = 'text/x-editor-name';
                const keyHtml = 'text/x-editor-html';
                const toggle = () => {
                    const isDraggable = node.hasAttribute('draggable');

                    this.content.querySelectorAll('[draggable]').forEach(item => {
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
                const allowDrop = ev => {
                    const name = ev.dataTransfer.getData(keyName);

                    if (name && this.allowed(name, parentName)) {
                        ev.preventDefault();
                        node.setAttribute('data-editor-dragover', '');
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
                node.addEventListener('dragleave', () => node.removeAttribute('data-editor-dragover'));
                node.addEventListener('drop', ev => {
                    const name = ev.dataTransfer.getData(keyName);
                    const html = ev.dataTransfer.getData(keyHtml);

                    ev.preventDefault();
                    node.removeAttribute('data-editor-dragover');

                    if (name && this.allowed(name, parentName) && html) {
                        node.insertAdjacentHTML('beforebegin', html);
                    }
                });
            }
        })));

        // Disable dragging of anchor and image elements
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLAnchorElement || node instanceof HTMLImageElement) {
                node.draggable = false;
                node.addEventListener('dragstart', ev => ev.preventDefault());
            }
        })));

        // Figure observer to create missing figcaption elements
        this.register(ev => ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'figure' && !node.querySelector(':scope > figcaption')) {
                node.appendChild(this.document.createElement('figcaption'));
            }
        })));
    }

    /**
     * Init Toolbar
     */
    initToolbar() {
        this.content.addEventListener('selectstart', () => {
            const active = this.document.activeElement;

            if (active.contentEditable && this.allowedGroup('text', active.tagName)) {
                this.toolbarEditable.classList.add('editor-toolbar-active');
                this.toolbarEditable.style.top = (active.offsetTop + active.offsetParent.offsetTop - this.toolbarEditable.clientHeight) + 'px';
            }
        });
        this.document.addEventListener('selectionchange', () => {
            const active = this.document.activeElement;

            if (this.window.getSelection().isCollapsed || !active.contentEditable || !this.content.contains(active)) {
                this.toolbarEditable.classList.remove('editor-toolbar-active');
                this.toolbarEditable.removeAttribute('style');
            }
        });

        for (let cmd of this.commands.entries()) {
            const item = this.document.createElement('button');
            item.setAttribute('type', 'button');
            item.setAttribute('data-cmd', cmd[0]);
            item.setAttribute('title', cmd[0]);
            item.innerText = cmd[0];
            item.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.content, true)) {
                    this.content.focus();
                }

                cmd[1].execute();
            });

            if (cmd[1] instanceof TextCommand) {
                this.toolbarEditable.appendChild(item);
            } else {
                this.toolbarWidget.appendChild(item);
            }
        }
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {Function} call
     * @param {Object} config
     */
    register(call, config = {childList: true, subtree: true}) {
        if (typeof call !== 'function') {
            throw 'Invalid observer';
        }

        const mutation = new MutationObserver(call);
        mutation.observe(this.content, config);
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
        const content = this.content.cloneNode(true);
        this.filter(content, true);

        return content.innerHTML;
    }

    /**
     * Saves editor data to source element
     */
    save() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.orig.value = this.getData();
        } else {
            this.orig.innerHTML = this.getData();
        }
    }

    /**
     * Inserts an element at the editor element or optionally after given reference element
     *
     * @param {HTMLElement} element
     * @param {?HTMLElement} ref
     */
    insert(element, ref = null) {
        if (!(element instanceof HTMLElement) || ref && !(ref instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const parent = ref ? ref.parentElement : this.content;
        const parentName = this.getTagName(parent);

        if (!this.content.contains(parent) || !this.allowed(element.tagName, parentName)) {
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
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const ancEdit = this.getSelectedEditable();


        if (sel.isCollapsed || !sel.toString().trim() || !(anc instanceof HTMLElement) || !ancEdit) {
            return;
        }

        const range = sel.getRangeAt(0);
        const tag = this.getTag(anc.tagName);
        const parent = !tag || tag.group === 'text' ? anc.parentElement : anc;

        if (range.startContainer instanceof Text && !range.startContainer.parentElement.isSameNode(parent)) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && !range.endContainer.parentElement.isSameNode(parent)) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        let same = Array.from(selNodes).every(item => {
            return item instanceof Text && !item.nodeValue.trim() || item instanceof HTMLElement && item.tagName === element.tagName;
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
     * Returns current selected element or null
     *
     * @return {?HTMLElement}
     */
    getSelectedElement() {
        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        return anc instanceof HTMLElement && foc instanceof HTMLElement && anc.isSameNode(foc) ? anc : null;
    }

    /**
     * Returns current selected contenteditable or null
     *
     * @return {?HTMLElement}
     */
    getSelectedEditable() {
        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        if (anc instanceof HTMLElement && foc instanceof HTMLElement) {
            const ancEdit = anc.closest('[contenteditable=true]');
            const focEdit = foc.closest('[contenteditable=true]');

            if (ancEdit instanceof HTMLElement && focEdit instanceof HTMLElement && ancEdit.isSameNode(focEdit)) {
                return ancEdit;
            }
        }

        return null;
    }

    /**
     * Returns current selected widget or null
     *
     * @return {?HTMLElement}
     */
    getSelectedWidget() {
        const el = this.getSelectedElement();

        return el ? el.closest('div.editor-content > *') : null;
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

        const isRoot = forceRoot || this.content.isSameNode(parent);
        const parentName = forceRoot ? 'root' : this.getTagName(parent);
        let br;

        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (node instanceof HTMLElement) {
                node = this.convert(node);
                const name = node.tagName;
                const tag = this.getTag(name);
                const text = node.innerText.trim();

                if (!tag) {
                    parent.removeChild(node);
                } else if (this.allowed(name, parentName) || isRoot && tag.group === 'text') {
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
                } else if (isRoot && text) {
                    const p = this.document.createElement('p');
                    p.innerText = text;
                    parent.replaceChild(p, node);
                } else if (text) {
                    parent.replaceChild(this.document.createTextNode(text), node);
                } else {
                    parent.removeChild(node);
                }
            } else if (node instanceof Text) {
                if (isRoot && node.nodeValue.trim()) {
                    const p = this.document.createElement('p');
                    p.innerText = node.nodeValue.trim();
                    parent.replaceChild(p, node);
                } else if (isRoot) {
                    parent.removeChild(node);
                }
            } else {
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

        return this.content.isSameNode(element) ? 'root' : element.tagName;
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
     * @param {HTMLElement} element
     *
     * @return {Node}
     */
    convert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const converter = this.converters.get(element.tagName.toLowerCase());

        if (!converter) {
            return element;
        }

        const newNode = converter.convert(element);
        element.parentElement.replaceChild(newNode, element);

        return newNode;
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
        const origin = this.window.origin || this.window.location.origin;
        a.href = url;

        return a.origin === origin ? a.pathname : a.href;
    }

    /**
     * Factory method to create a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {EditorConfig} config
     *
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new Editor(element, config);
        editor.init();

        return editor;
    }
}
