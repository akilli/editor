import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Bold Plugin
 */
export default class Bold extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'bold';
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
        this._translator(i18n);
        this._tag({name: 'b', group: 'format'});
        this._command('b');
        this._toolbar('bold', 'b');
    }
}
