import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Mark Plugin
 */
export default class Mark extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'mark';
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
            name: 'mark',
            group: 'format',
        });
        this._command('mark');
        this._toolbar('mark', 'm');
    }
}
