import Element from '../base/Element.js';
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
        const data = this.editor.config.base && i18n[this.editor.config.base.lang] ? i18n[this.editor.config.base.lang] : {};
        this.editor.translators.set(new Translator(this.name, data));
        this.editor.elements.set(new Element(this.editor, this.name, 'a'));
        this.editor.dialogs.set(new LinkDialog(this.editor, this.name));
        this.editor.commands.set(new LinkCommand(this.editor));
    }
}
