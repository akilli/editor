import Plugin from '../base/Plugin.js';
import QuoteCommand from './QuoteCommand.js';
import Tag from '../base/Tag.js';

/**
 * Quote Plugin
 */
export default class QuotePlugin extends Plugin {
    /**
     * Initializes a new quote plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'quote');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set(new Tag({name: 'blockquote', group: 'quote', children: ['paragraph']}));
        this.editor.commands.set(new QuoteCommand(this.editor));
    }
}
