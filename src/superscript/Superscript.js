import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Superscript Plugin
 */
export default class Superscript extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'superscript';
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
            name: TagName.SUP,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.SUP);
        this._toolbar('superscript', Key.Y, true);
    }
}
