import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import PreformatFilter from './PreformatFilter.js';
import PreformatListener from './PreformatListener.js';
import i18n from './i18n.js';

/**
 * Preformat Plugin
 */
export default class Preformat extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'preformat';
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
            name: 'pre',
            group: 'preformat',
            children: ['break'],
            deletable: true,
            editable: true,
            navigable: true,
            enter: 'p',
        });
        new PreformatListener(this._editor);
        this._command('pre');
        this._toolbar('Preformatted Text');
        this._editor.filters.add(new PreformatFilter(this._editor));
    }
}
