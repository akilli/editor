import AudioCommand from './AudioCommand.js';
import AudioDialog from './AudioDialog.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';
import i18n from './i18n.js';

/**
 * Audio Plugin
 */
export default class AudioPlugin extends Plugin {
    /**
     * Initializes a new audio plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'audio');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set(new Tag({name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}));
        this.registerTranslator(i18n);

        if (this.editor.config[this.name].browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.name, this.editor.config[this.name].browser));
        } else {
            this.editor.dialogs.set(new AudioDialog(this.editor, this.name));
        }

        this.editor.commands.set(new AudioCommand(this.editor));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {browser: null};
    }
}
