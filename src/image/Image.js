import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import ImageDialog from './ImageDialog.js';
import ImageListener from './ImageListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Image Plugin
 */
export default class Image extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'image';
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
        return { browser: null };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.IMG,
            group: TagGroup.IMAGE,
            attributes: ['alt', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new ImageListener(this.editor);
        const url = this.editor.config.image.browser;

        if (url) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.constructor.name, url));
        } else {
            this.editor.dialogs.set(new ImageDialog(this.editor));
        }

        this._command(TagName.IMG);
        this._toolbar('Image');
    }
}
