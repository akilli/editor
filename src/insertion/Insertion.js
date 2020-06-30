import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Insertion Plugin
 */
export default class Insertion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'insertion';
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
            name: 'ins',
            group: 'format',
        });
        this._command('ins');
        this._toolbar('Text Insertion', 'f', true);
    }
}
