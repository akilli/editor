import Dialog from './Dialog.js';

/**
 * Browser Dialog
 */
export default class BrowserDialog extends Dialog {
    /**
     * Browser URL
     *
     * @type {String}
     */
    #url;

    /**
     * Browser window configuration
     *
     * @type {Object.<String, String>}
     */
    opts = Object.assign({
        alwaysRaised: 'yes',
        dependent: 'yes',
        height: `${this.editor.window.screen.height}`,
        location: 'no',
        menubar: 'no',
        minimizable: 'no',
        modal: 'yes',
        resizable: 'yes',
        scrollbars: 'yes',
        toolbar: 'no',
        width: `${this.editor.window.screen.width}`,
    }, this.editor.config.base.browser);

    /**
     * Initializes a new editor browser dialog
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} url
     */
    constructor(editor, name, url) {
        super(editor, name);

        if (!url || typeof url !== 'string') {
            throw 'Invalid argument';
        }

        this.#url = url;
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @inheritDoc
     */
    open(save, attributes = {}) {
        const features = Object.entries(this.opts).map(x => `${x[0]}=${x[1]}`).join(',');
        const a = this.editor.createElement('a', {attributes: {href: this.#url}});
        const url = new URL(a.href);
        Object.entries(attributes).forEach(([key, val]) => url.searchParams.set(key, `${val}`));
        const win = this.editor.window.open(url.toString(), this.name, features);
        this.editor.window.addEventListener('message', event => {
            if (event.origin === url.origin && event.source === win) {
                save(event.data);
                win.close();
            }
        }, false);
    }
}
