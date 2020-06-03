import AudioCommand from './AudioCommand.js';
import AudioDialog from './AudioDialog.js';
import BrowserDialog from '../base/BrowserDialog.js';
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
    static get config() {
        return {browser: null};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'audio',
            group: 'media',
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.registerTranslator(i18n);

        if (this.editor.config.audio.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'audio', this.editor.config.audio.browser));
        } else {
            this.editor.dialogs.set(new AudioDialog(this.editor));
        }

        this.editor.commands.set(new AudioCommand(this.editor));
    }
}