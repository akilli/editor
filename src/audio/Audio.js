import AudioCommand from './AudioCommand.js';
import AudioDialog from './AudioDialog.js';
import AudioObserver from './AudioObserver.js';
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
        this.editor.tags.create({
            name: 'audio',
            group: 'audio',
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.editor.observe(new AudioObserver(this.editor));
        this.registerTranslator(i18n);

        if (this.editor.config.audio.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'audio', this.editor.config.audio.browser));
        } else {
            this.editor.dialogs.set(new AudioDialog(this.editor));
        }

        this.editor.commands.set(new AudioCommand(this.editor));
    }
}
