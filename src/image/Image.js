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
        this._i18n(i18n);
        this._tag({
            name: 'img',
            group: 'image',
            attributes: ['alt', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new ImageListener(this._editor);

        if (this._editor.config.image.browser) {
            this._editor.dialogs.set(new BrowserDialog(this._editor, 'image', this._editor.config.image.browser));
        } else {
            this._editor.dialogs.set(new ImageDialog(this._editor));
        }

        this._command('img');
        this._toolbar('Image');
    }
}
