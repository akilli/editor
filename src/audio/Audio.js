import AudioDialog from './AudioDialog.js';
import AudioListener from './AudioListener.js';
import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

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
        return { browser: undefined };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.AUDIO,
            group: TagGroup.AUDIO,
            attributes: ['controls', 'src'],
            empty: true,
            navigable: true,
        });
        new AudioListener(this.editor);
        const url = this.editor.config.audio.browser;

        if (url) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.constructor.name, url));
        } else {
            this.editor.dialogs.set(new AudioDialog(this.editor));
        }

        this._command(TagName.AUDIO);
        this._toolbar('Audio');
    }
}
