import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

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
            name: TagName.INS,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.INS);
        this._formatbar('Text Insertion', Key.F);
    }
}
