import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Strikethrough Plugin
 */
export default class Strikethrough extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strikethrough';
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
            name: 's',
            group: 'format',
        });
        this._command('s');
        this._toolbar('strikethrough', 'r', true);
    }
}
