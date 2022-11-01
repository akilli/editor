import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Strong Plugin
 */
export default class Strong extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strong';
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
        this._tag({ name: TagName.STRONG, group: TagGroup.FORMAT });
        this._command(TagName.STRONG);
        this._formatbar(this._('strongly emphasized'), Key.S);
    }
}
