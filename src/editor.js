import Command from './command/command';

/**
 * Editor
 */
class Editor {
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
         * @type {Object}
         * @readonly
         */
        this.config = config;

        /**
         * @type {string[]}
         * @readonly
         */
        this.allowed = ['a', 'blockquote', 'br', 'h2', 'h3', 'i', 'img', 'li', 'ol', 'p', 'strong', 'u', 'ul'];

        /**
         * Editor commands
         *
         * @type {Map<string, Command>}
         */
        this.commands = new Map();

        /**
         * @type {HTMLElement}
         * @readonly
         */
        this.element = element;

        /**
         * @type {Document}
         * @readonly
         */
        this.document = element.ownerDocument;

        /**
         * @type {Window}
         * @readonly
         */
        this.window = element.ownerDocument.defaultView;

        let html = this.element.innerHTML;

        if (element instanceof HTMLTextAreaElement) {
            this.element = this.document.createElement('div');
            html = element.value;
            element.parentNode.insertBefore(this.element, element);
            element.setAttribute('hidden', 'hidden');
            element.form.addEventListener('submit', () => {
                element.value = this.getData();
            });
        }

        this.toolbar();
        this.setData(html);
        this.element.classList.add('editor');
        this.element.setAttribute('contenteditable', 'true');
    }

    /**
     * Returns editor element's innerHTML
     *
     * @return {string}
     */
    getData() {
        return this.filter(this.element.innerHTML);
    }

    /**
     * Sets editor element's innerHTML
     *
     * @param {string} html
     */
    setData(html) {
        this.element.innerHTML = this.filter(html);
    }

    /**
     * Init toolbar
     */
    toolbar() {
        const toolbar = this.document.createElement('div');

        for (let item of this.commands) {
            const img = this.document.createElement('img');

            img.setAttribute('src', Editor.icon(item[0]));
            img.setAttribute('alt', item[0]);
            img.setAttribute('title', item[0]);
            img.addEventListener('click', () => {
                if (this.window.getSelection().containsNode(this.element, true)) {
                    item[1].execute();
                }
            });
            toolbar.appendChild(img);
        }

        toolbar.classList.add('editor-toolbar');
        this.element.parentNode.insertBefore(toolbar, this.element);
    }

    /**
     * Execute command
     *
     * @param {string} command
     * @param {?string} value
     */
    execute(command, value = null) {
        this.document.execCommand(command, false, value);
    }

    /**
     *
     * @param {string} command
     *
     * @return {string}
     */
    static icon(command) {
        return '/src/theme/icon/' + command + '.svg';
    }

    /**
     * Filter HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    filter(html) {
        return Editor.trim(Editor.strip(html, this.allowed));
    }

    /**
     * Strip tags
     *
     * @param {string} html
     * @param {Array} allowed
     *
     * @return {string}
     */
    static strip(html, allowed = []) {
        const call = ($0, $1) => allowed.indexOf($1.toLowerCase()) > -1 ? $0 : '';

        return html ? html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, call) : '';
    }

    /**
     * Trim HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    static trim(html) {
        return html ? html.trim().replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/^(<br\s*\/?>)+/gi, ' ').replace(/(<br\s*\/?>)+$/gi, ' ').trim() : '';
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
        return new Editor(element, config);
    }
}
