import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Mark Plugin
 */
export default class Mark extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'mark';
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
        this._tag({ name: TagName.MARK, group: TagGroup.FORMAT });
        this._command(TagName.MARK);
        this._formatbar(this._('mark'), Key.M);
    }
}
