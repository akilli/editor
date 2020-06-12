import AudioDialog from './AudioDialog.js';
import AudioListener from './AudioListener.js';
import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Command from '../base/Command.js';
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
        this.editor.tags.allow(this.editor.content, 'audio');
        this.editor.tags.allow('figure', 'audio');
        new AudioListener(this.editor);

        if (i18n[this.editor.config.base.lang]) {
            this.editor.i18n.set('audio', i18n[this.editor.config.base.lang]);
        }

        if (this.editor.config.audio.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'audio', this.editor.config.audio.browser));
        } else {
            this.editor.dialogs.set(new AudioDialog(this.editor));
        }

        this.editor.commands.set(new Command(this.editor, 'audio', 'audio'));
    }
}
