import DetailsCommand from './DetailsCommand.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';
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
        this.editor.tags.set(new Tag({name: 'details', group: 'details', children: ['figure', 'list', 'paragraph', 'summary']}));
        this.editor.tags.set(new Tag({name: 'summary', group: 'summary', editable: true, enter: 'p'}));
        this.editor.observe(new DetailsObserver(this.editor));
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        this.editor.commands.set(new DetailsCommand(this.editor));
    }
}
