import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import IframeDialog from './IframeDialog.js';
import IframeListener from './IframeListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

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
        return { browser: undefined };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.IFRAME,
            group: TagGroup.IFRAME,
            attributes: ['allowfullscreen', 'height', 'id', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new IframeListener(this.editor);
        this.editor.dialogs.set(new IframeDialog(this.editor, this.editor.config.iframe.browser));
        this._command(TagName.IFRAME);
        this._toolbar(this._('Iframe'));
    }
}
