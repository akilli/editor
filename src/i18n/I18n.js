import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import de from './de.js';

export default class I18n extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'i18n';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._i18n({ de });
    }
}
