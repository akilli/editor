import Element from '../editor/Element.js';
import LinkCommand from './LinkCommand.js';
import LinkDialog from './LinkDialog.js';
import Plugin from '../editor/Plugin.js';
import Translator from '../editor/Translator.js';
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
        this.editor.translators.set(this.name, new Translator(this.name, i18n[this.editor.config.editor?.lang] || {}));
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'a'));
        this.editor.dialogs.set(this.name, new LinkDialog(this.editor, this.name));
        this.editor.commands.set(this.name, new LinkCommand(this.editor));
    }
}
