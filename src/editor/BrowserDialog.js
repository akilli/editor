import Dialog from './Dialog.js';

/**
 * Default browser window configuration
 *
 * @type {Object.<String, String>}
 */
const defaultOpts = {
    alwaysRaised: 'yes',
    dependent: 'yes',
    location: 'no',
    menubar: 'no',
    minimizable: 'no',
    modal: 'yes',
    resizable: 'yes',
    scrollbars: 'yes',
    toolbar: 'no',
};

/**
 * Browser Dialog
 */
export default class BrowserDialog extends Dialog {
    /**
     * Initializes a new editor browser dialog
     *
     * @param {Editor} editor
     * @param {Function} save
     * @param {String} url
     * @param {String} [name = 'browser']
     * @param {Object.<String, String>} [opts = {}]
     */
    constructor(editor, save, url, name = 'browser', opts = {}) {
        super(editor, save);

        if (!url || !name) {
            throw 'Invalid argument';
        }

        const baseOpts = {height: `${this.editor.window.screen.height}`, width: `${this.editor.window.screen.width}`};

        /**
         * Browser URL
         *
         * @type {String}
         */
        this.url = url;

        /**
         * Browser window name
         *
         * @type {String}
         */
        this.name = name;

        /**
         * Browser window configuration
         *
         * @type {Object.<String, String>}
         */
        this.opts = Object.assign(baseOpts, defaultOpts, opts);
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @inheritDoc
     */
    open(oldData = {}) {
        const features = Object.entries(this.opts).map(x => `${x[0]}=${x[1]}`).join(',');
        const win = this.editor.window.open(this.url, this.name, features);
        const a = this.editor.createElement('a', {href: this.url});

        this.editor.window.addEventListener('message', ev => {
            if (ev.origin === a.origin && ev.source === win) {
                this.save(ev.data);
                win.close();
            }
        }, false);
    }
}
