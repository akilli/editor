import AudioDialog from './AudioDialog.js';
import AudioListener from './AudioListener.js';
import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Audio Plugin
 */
export default class Audio extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'audio';
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
            name: 'audio',
            group: 'audio',
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new AudioListener(this._editor);

        if (this._editor.config.audio.browser) {
            this._editor.dialogs.set(new BrowserDialog(this._editor, 'audio', this._editor.config.audio.browser));
        } else {
            this._editor.dialogs.set(new AudioDialog(this._editor));
        }

        this._command('audio');
        this._toolbar('Audio');
    }
}
