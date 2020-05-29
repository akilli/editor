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
    url;

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

        this.url = url;
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @inheritDoc
     */
    open(save, attributes = {}) {
        const features = Object.entries(this.opts).map(x => `${x[0]}=${x[1]}`).join(',');
        const win = this.editor.window.open(this.url, this.name, features);
        const a = this.editor.createElement('a', {attributes: {href: this.url}});

        this.editor.window.addEventListener('message', ev => {
            if (ev.origin === a.origin && ev.source === win) {
                save(ev.data);
                win.close();
            }
        }, false);
    }
}
