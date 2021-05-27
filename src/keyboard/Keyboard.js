import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Keyboard Plugin
 */
export default class Keyboard extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'keyboard';
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
            name: TagName.KBD,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.KBD);
        this._toolbar('User Input', Key.K, true);
    }
}
