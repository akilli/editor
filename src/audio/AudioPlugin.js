import AudioDialog from './AudioDialog.js';
import BrowserDialog from '../browser/BrowserDialog.js';
import Command from '../base/Command.js';
import MediaElement from '../media/MediaElement.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
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
    config() {
        return {browserUrl: null, browserOpts: {}};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        this.editor.elements.set(new MediaElement(this.editor, this.name, 'audio'));
        const dialog = this.editor.config[this.name].browserUrl ? BrowserDialog : AudioDialog;
        this.editor.dialogs.set(new dialog(this.editor, this.name));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
