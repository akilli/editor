import LinkCommand from './LinkCommand.js';
import LinkDialog from './LinkDialog.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
import i18n from './i18n.js';

/**
 * Link Plugin
 */
export default class LinkPlugin extends Plugin {
    /**
     * Initializes a new link plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'link');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        this.editor.dialogs.set(new LinkDialog(this.editor, this.name));
        this.editor.commands.set(new LinkCommand(this.editor));
    }
}
