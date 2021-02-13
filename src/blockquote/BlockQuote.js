import Base from '../base/Base.js';
import BlockQuoteFilter from './BlockQuoteFilter.js';
import BlockQuoteListener from './BlockQuoteListener.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Block Quote Plugin
 */
export default class BlockQuote extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'blockquote';
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
        this._tag({
            name: 'blockquote',
            group: 'quote',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            navigable: true,
            enter: 'p',
        });
        new BlockQuoteListener(this.editor);
        this._command('blockquote');
        this._toolbar('Block Quote');
        this.editor.filters.add(new BlockQuoteFilter(this.editor));
    }
}
