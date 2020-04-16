import BrowserDialog from '../browser/BrowserDialog.js';
import Command from '../base/Command.js';
import ImageDialog from './ImageDialog.js';
import MediaElement from '../media/MediaElement.js';
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
    init() {
        this.editor.translators.set(this.name, new Translator(this.name, i18n[this.editor.config.base?.lang] || {}));
        this.editor.elements.set(this.name, new MediaElement(this.editor, this.name, 'img'));
        const dialog = this.editor.config[this.name]?.browser ? BrowserDialog : ImageDialog;
        this.editor.dialogs.set(this.name, new dialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
