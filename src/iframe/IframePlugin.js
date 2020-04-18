import BrowserDialog from '../browser/BrowserDialog.js';
import Command from '../base/Command.js';
import IframeDialog from './IframeDialog.js';
import IframeElement from './IframeElement.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
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
    config() {
        return {browserUrl: null, browserOpts: {}};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        this.editor.elements.set(new IframeElement(this.editor));
        const dialog = this.editor.config[this.name].browserUrl ? BrowserDialog : IframeDialog;
        this.editor.dialogs.set(new dialog(this.editor, this.name));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
