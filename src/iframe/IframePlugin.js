import BrowserDialog from '../editor/BrowserDialog.js';
import Command from '../editor/Command.js';
import IframeDialog from './IframeDialog.js';
import MediaElement from '../media/MediaElement.js';
import Plugin from '../editor/Plugin.js';
import Translator from '../editor/Translator.js';
import i18n from './i18n.js';

/**
 * Iframe Plugin
 */
export default class IframePlugin extends Plugin {
    /**
     * Initializes a new iframe plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(this.name, new Translator(this.name, i18n[this.editor.config.editor?.lang] || {}));
        this.editor.elements.set(this.name, new MediaElement(this.editor, this.name, 'iframe'));
        const dialog = this.editor.config[this.name]?.browser ? BrowserDialog : IframeDialog;
        this.editor.dialogs.set(this.name, new dialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
