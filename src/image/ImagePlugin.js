import BrowserDialog from '../base/BrowserDialog.js';
import ImageCommand from './ImageCommand.js';
import ImageDialog from './ImageDialog.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
import i18n from './i18n.js';

/**
 * Image Plugin
 */
export default class ImagePlugin extends Plugin {
    /**
     * Initializes a new image plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image');
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
        const dialog = this.editor.config[this.name].browserUrl ? BrowserDialog : ImageDialog;
        this.editor.dialogs.set(new dialog(this.editor, this.name));
        this.editor.commands.set(new ImageCommand(this.editor));
    }
}
