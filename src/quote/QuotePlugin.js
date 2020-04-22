import Plugin from '../base/Plugin.js';
import QuoteCommand from './QuoteCommand.js';

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
        const tagName = 'blockquote';
        this.registerTag({name: tagName, group: 'quote', children: ['paragraph']});
        this.editor.commands.set(new QuoteCommand(this.editor, this.name, tagName));
    }
}
