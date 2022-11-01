import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import i18n from './i18n.js';
import { TagName } from '../base/enum.js';

/**
 * Sample Plugin
 */
export default class Sample extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'sample';
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
        this._tag({ name: TagName.SAMP, group: TagGroup.FORMAT });
        this._command(TagName.SAMP);
        this._formatbar(this._('Sample Output'), Key.O);
    }
}
