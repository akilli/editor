import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

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
            name: TagName.S,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.S);
        this._formatbar('strikethrough', Key.R);
    }
}
