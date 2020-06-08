import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import QuoteFilter from './QuoteFilter.js';
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
        return [Base, Break, Figure];
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
        this.editor.observe(new QuoteObserver(this.editor));
        this.registerCommand('quote', 'blockquote');
        this.editor.filters.add(new QuoteFilter(this.editor));
    }
}
