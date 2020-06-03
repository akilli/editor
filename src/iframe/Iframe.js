import BrowserDialog from '../base/BrowserDialog.js';
import IframeCommand from './IframeCommand.js';
import IframeDialog from './IframeDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Iframe Plugin
 */
export default class Iframe extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'iframe';
    }

    /**
     * @inheritDoc
     */
    static get config() {
        return {browser: null};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'iframe',
            group: 'media',
            attributes: ['allowfullscreen', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.registerTranslator(i18n);

        if (this.editor.config.iframe.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'iframe', this.editor.config.iframe.browser));
        } else {
            this.editor.dialogs.set(new IframeDialog(this.editor));
        }

        this.editor.commands.set(new IframeCommand(this.editor));
    }
}