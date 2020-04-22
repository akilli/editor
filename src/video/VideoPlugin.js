import BrowserDialog from '../base/BrowserDialog.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';
import VideoCommand from './VideoCommand.js';
import VideoDialog from './VideoDialog.js';
import i18n from './i18n.js';

/**
 * Video Plugin
 */
export default class VideoPlugin extends Plugin {
    /**
     * Initializes a new video plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'video');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set(new Tag({name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}));
        this.registerTranslator(i18n);

        if (this.editor.config[this.name].browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.name, this.editor.config[this.name].browser));
        } else {
            this.editor.dialogs.set(new VideoDialog(this.editor, this.name));
        }

        this.editor.commands.set(new VideoCommand(this.editor));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {browser: null};
    }
}
