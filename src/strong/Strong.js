import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Strong Plugin
 */
export default class Strong extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strong';
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
            name: 'strong',
            group: 'format',
        });
        this._command('strong');
        this._toolbar('strongly emphasized', 's', true);
    }
}
