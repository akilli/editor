import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import QuoteFilter from './QuoteFilter.js';
import QuoteListener from './QuoteListener.js';
import i18n from './i18n.js';

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
        this._i18n(i18n);
        this._tag({name: 'blockquote', group: 'quote', deletable: true, editable: true, navigable: true, enter: 'p'});
        this.editor.tags.allow(this.editor.content, 'quote');
        this.editor.tags.allow('figure', 'quote');
        this.editor.tags.allow('blockquote', 'break', 'format');
        new QuoteListener(this.editor);
        this._command('blockquote');
        this._toolbar('Quote');
        this.editor.filters.add(new QuoteFilter(this.editor));
    }
}
