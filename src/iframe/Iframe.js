import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import IframeDialog from './IframeDialog.js';
import IframeListener from './IframeListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Iframe extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'iframe';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Figure];
    }

    /**
     * @type {Object.<string, any>}
     */
    static get config() {
        return { browser: undefined };
    }

    /**
     * @return {void}
     */
    init() {
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
        this._toolbar('Iframe');
    }
}
