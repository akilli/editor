import Base from '../base/Base.js';
import Caption from '../caption/Caption.js';
import Plugin from '../base/Plugin.js';
import QuoteCommand from './QuoteCommand.js';
import QuoteObserver from './QuoteObserver.js';

/**
 * Quote Plugin
 */
export default class Quote extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'quote';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Caption];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'blockquote',
            group: 'quote',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
        });
        this.editor.commands.set(new QuoteCommand(this.editor));
        this.editor.observe(new QuoteObserver(this.editor));
    }
}
