import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Sample Plugin
 */
export default class Sample extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'sample';
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
            name: 'samp',
            group: 'format',
        });
        this._command('samp');
        this._toolbar('Sample Output', 'o', true);
    }
}
