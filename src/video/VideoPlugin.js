import BrowserDialog from '../browser/BrowserDialog.js';
import Command from '../base/Command.js';
import MediaElement from '../media/MediaElement.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
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
        const data = this.editor.config.base && i18n[this.editor.config.base.lang] ? i18n[this.editor.config.base.lang] : {};
        this.editor.translators.set(this.name, new Translator(this.name, data));
        this.editor.elements.set(this.name, new MediaElement(this.editor, this.name, 'video'));
        const dialog = this.editor.config[this.name] && this.editor.config[this.name].browser ? BrowserDialog : VideoDialog;
        this.editor.dialogs.set(this.name, new dialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
