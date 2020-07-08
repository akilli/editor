import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import VideoDialog from './VideoDialog.js';
import VideoListener from './VideoListener.js';
import i18n from './i18n.js';

/**
 * Video Plugin
 */
export default class Video extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'video';
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
            name: 'video',
            group: 'video',
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new VideoListener(this._editor);

        if (this._editor.config.video.browser) {
            this._editor.dialogs.set(new BrowserDialog(this._editor, 'video', this._editor.config.video.browser));
        } else {
            this._editor.dialogs.set(new VideoDialog(this._editor));
        }

        this._command('video');
        this._toolbar('Video');
    }
}
