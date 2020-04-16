import Command from '../base/Command.js';
import DetailsElement from './DetailsElement.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../base/Plugin.js';
import Translator from '../base/Translator.js';
import i18n from './i18n.js';

/**
 * Details Plugin
 */
export default class DetailsPlugin extends Plugin {
    /**
     * Initializes a new details plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.translators.set(this.name, new Translator(this.name, i18n[this.editor.config.base?.lang] || {}));
        this.editor.observe(new DetailsObserver(this.editor, 'details'));
        this.editor.elements.set(this.name, new DetailsElement(this.editor));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
