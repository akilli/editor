import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Definition Plugin
 */
export default class Definition extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'definition';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: 'dfn',
            group: 'format',
        });
        this._command('dfn');
        this._toolbar('Definition', 'd');
    }
}
