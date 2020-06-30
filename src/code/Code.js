import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Code Plugin
 */
export default class Code extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'code';
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
            name: 'code',
            group: 'format',
        });
        this._command('code');
        this._toolbar('Code', 'c', true);
    }
}
