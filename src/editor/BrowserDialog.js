import Dialog from './Dialog.js';

/**
 * Browser Dialog
 */
export default class BrowserDialog extends Dialog {
    /**
     * Initializes a new editor browser dialog
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        super(editor, name);

        if (!this.editor.config[this.name]?.browser) {
            throw 'Invalid argument';
        }

        /**
         * Browser URL
         *
         * @type {String}
         */
        this.url = this.editor.config[this.name].browser;

        /**
         * Browser window configuration
         *
         * @type {Object.<String, String>}
         */
        this.opts = Object.assign({
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
        }, this.editor.config.browser || {});
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @inheritDoc
     */
    open(save, oldData = {}) {
        const features = Object.entries(this.opts).map(x => `${x[0]}=${x[1]}`).join(',');
        const win = this.editor.window.open(this.url, this.name, features);
        const a = this.editor.createElement('a', {href: this.url});

        this.editor.window.addEventListener('message', ev => {
            if (ev.origin === a.origin && ev.source === win) {
                save(ev.data);
                win.close();
            }
        }, false);
    }
}
