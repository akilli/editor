import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import de from './de.js';

/**
 * I18n Plugin
 */
export default class I18n extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'i18n';
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
        this._i18n({ de });
    }
}
