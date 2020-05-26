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
        this.editor.tags.create({name: 'blockquote', group: 'quote', children: ['break', 'format', 'text'], editable: true, enter: 'p'});
        this.editor.commands.set(new QuoteCommand(this.editor));
    }
}
