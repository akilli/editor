import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Deletion Plugin
 */
export default class Deletion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'deletion';
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
            name: 'del',
            group: 'format',
        });
        this._command('del');
        this._toolbar('Text Deletion', 'g');
    }
}
