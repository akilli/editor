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
         * @private
         */
        this._config = config;

        /**
         * @type {string[]}
         * @private
         */
        this._allowed = ['a', 'blockquote', 'br', 'h2', 'h3', 'i', 'img', 'li', 'ol', 'p', 'strong', 'u', 'ul'];

        /**
         * @type {Object}
         * @private
         */
        this._commands = {
            'paragraph': () => {
                this.execute('insertparagraph');
            },
            'h2': () => {
                this.execute('formatblock', '<h2>');
            },
            'h3': () => {
                this.execute('formatblock', '<h3>');
            },
            'bold': (selection) => {
                this.insertHtml('strong', selection);
            },
            'italic': (selection) => {
                this.insertHtml('i', selection);
            },
            'underline': () => {
                this.execute('underline');
            },
            'clear': () => {
                this.execute('removeformat');
            },
            'link': () => {
                let url;

                if (url = prompt('URL', 'http://')) {
                    this.execute('createlink', url);
                }
            },
            'unlink': () => {
                this.execute('unlink');
            },
            'ol': () => {
                this.execute('insertorderedlist');
            },
            'ul': () => {
                this.execute('insertunorderedlist');
            },
            'quote': () => {
                this.execute('formatblock', '<blockquote>');
            },
            'image': () => {
                const url = prompt('URL', 'http://');

                if (url) {
                    this.execute('insertimage', url);
                }
            }
        };

        /**
         * @type {HTMLElement}
         * @private
         */
        this._element = element;

        /**
         * @type {Document}
         * @private
         */
        this._document = element.ownerDocument;

        /**
         * @type {Window}
         * @private
         */
        this._window = element.ownerDocument.defaultView;

        if (element instanceof HTMLTextAreaElement) {
            this._element = this._document.createElement('div');
            element.parentNode.appendChild(this._element);
            element.setAttribute('hidden', 'hidden');
            element.form.addEventListener('submit', () => {
                element.innerHTML = this.getData();
            });
        }

        this.toolbar();
        this._element.classList.add('rte');
        this._element.setAttribute('contenteditable', 'true');
    }

    getData() {
        return Editor.trim(Editor.strip(this._element.innerHTML, this._allowed));
    }

    toolbar() {
        const toolbar = this._document.createElement('div');

        Object.getOwnPropertyNames(this._commands).forEach((item) => {
            const img = this._document.createElement('img');

            img.setAttribute('src', Editor.icon(item));
            img.setAttribute('alt', item);
            img.setAttribute('title', item);
            img.setAttribute('data-rte-cmd', item);
            img.addEventListener('click', () => {
                const selection = this._window.getSelection();

                if (selection.containsNode(this._element, true)) {
                    this._commands[item](selection);
                }
            });

            toolbar.appendChild(img);
        });

        toolbar.classList.add('rte-toolbar');
        this._element.parentNode.insertBefore(toolbar, this._element);
    }

    /**
     * Execute command
     *
     * @param {string} command
     * @param {?string} value
     */
    execute(command, value = null) {
        this._document.execCommand(command, false, value);
    }

    /**
     * Insert HTML
     *
     * @param {string} tag
     * @param {Selection} selection
     */
    insertHtml(tag, selection) {
        const html = selection.toString();

        if (tag && html.length > 0) {
            this.execute('insertHTML', '<' + tag + '>' + html + '</' + tag + '>');
        }
    }

    static icon(key) {
        return '/src/theme/icon/' + key + '.svg';
    }

    /**
     * Trim HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    static trim(html) {
        return html ? html.trim().replace(/\s/g, ' ').replace(/^((<|&lt;)br\s*\/*(>|&gt;))+/gi, ' ').replace(/((<|&lt;)br\s*\/*(>|&gt;))+$/gi, ' ').trim() : '';
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
