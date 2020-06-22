import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Subscript Plugin
 */
export default class Subscript extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subscript';
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
            name: 'sub',
            group: 'format',
        });
        this._command('sub');
        this._toolbar('subscript', 'x');
    }
}
