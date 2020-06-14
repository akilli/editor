import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import ImageDialog from './ImageDialog.js';
import ImageListener from './ImageListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

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
        return {browser: null};
    }

    /**
     * @inheritDoc
     */
    init() {
        this._translator(i18n);
        this.editor.tags.set({
            name: 'img',
            group: 'image',
            attributes: ['alt', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.editor.tags.allow(this.editor.content, 'image');
        this.editor.tags.allow('figure', 'image');
        new ImageListener(this.editor);

        if (this.editor.config.image.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'image', this.editor.config.image.browser));
        } else {
            this.editor.dialogs.set(new ImageDialog(this.editor));
        }

        this._command('img');
        this._toolbar('Image');
    }
}
