import DetailsCommand from './DetailsCommand.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../base/Plugin.js';
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
        const tagName = 'details';
        this.registerTag({name: tagName, group: 'details', children: ['figure', 'list', 'paragraph', 'summary']});
        this.registerTag({name: 'summary', group: 'summary', editable: true, enter: 'p'});
        this.editor.observe(new DetailsObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.commands.set(new DetailsCommand(this.editor, this.name, tagName));
    }
}
