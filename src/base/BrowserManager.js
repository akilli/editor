import Editor from './Editor.js';

/**
 * Browser Manager
 */
export default class BrowserManager {
    /**
     * Editor
     *
     * @type {Editor}
     */
    #editor;

    /**
     * Browser window configuration
     *
     * @type {Object.<string, string>}
     */
    #opts = {
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
     * Initializes a new browser manager
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this.#editor = editor;
        Object.assign(
            this.#opts,
            {height: `${this.#editor.window.screen.height}`, width: `${this.#editor.window.screen.width}`},
            this.#editor.config.base.browser,
        );
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
    open({url, name, call, params = {}}) {
        if (!url || typeof url !== 'string' || !name || typeof name !== 'string' || typeof call !== 'function') {
            throw 'Invalid argument';
        }

        /** @type {HTMLAnchorElement} */
        const a = this.#editor.createElement('a', {attributes: {href: url}});
        const urlObject = new URL(a.href);
        Object.entries(params).forEach(([key, val]) => urlObject.searchParams.set(key, `${val}`));
        const win = this.#editor.window.open(urlObject.toString(), name, this.#features());
        this.#editor.window.addEventListener('message', event => {
            if (event.origin === urlObject.origin && event.source === win) {
                call(event.data);
                win.close();
            }
        }, false);
    }

    /**
     * Converts options to window features
     *
     * @return {string}
     */
    #features() {
        return Object.entries(this.#opts).filter(([, val]) => !!val).map(([key, val]) => `${key}=${val}`).join(',');
    }

    /**
     * Freezes itself
     */
    freeze() {
        Object.freeze(this);
    }
}
