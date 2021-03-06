import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Subscript Plugin
 */
export default class Subscript extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subscript';
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
        this._tag({ name: TagName.SUB, group: TagGroup.FORMAT });
        this._command(TagName.SUB);
        this._formatbar(this._('subscript'), Key.X);
    }
}
