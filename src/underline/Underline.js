import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Underline Plugin
 */
export default class Underline extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'underline';
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
            name: 'u',
            group: 'format',
        });
        this._command('u');
        this._toolbar('underline', 'u');
    }
}
