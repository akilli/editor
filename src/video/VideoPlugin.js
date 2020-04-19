import BrowserDialog from '../base/BrowserDialog.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
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
    config() {
        return {browserUrl: null, browserOpts: {}};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        const dialog = this.editor.config[this.name].browserUrl ? BrowserDialog : VideoDialog;
        this.editor.dialogs.set(new dialog(this.editor, this.name));
        this.editor.commands.set(new VideoCommand(this.editor));
    }
}
