import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import IframeDialog from './IframeDialog.js';
import IframeListener from './IframeListener.js';
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
    static get dependencies() {
        return [Base, Figure];
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
        this._i18n(i18n);
        this._tag({
            name: 'iframe',
            group: 'iframe',
            attributes: ['allowfullscreen', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.editor.tags.allow(this.editor.content, 'iframe');
        this.editor.tags.allow('figure', 'iframe');
        new IframeListener(this.editor);

        if (this.editor.config.iframe.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'iframe', this.editor.config.iframe.browser));
        } else {
            this.editor.dialogs.set(new IframeDialog(this.editor));
        }

        this._command('iframe');
        this._toolbar('Iframe');
    }
}
