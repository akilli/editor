import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Cite Plugin
 */
export default class Cite extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'cite';
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
            name: 'cite',
            group: 'format',
        });
        this._command('cite');
        this._toolbar('citation', 'z');
    }
}
