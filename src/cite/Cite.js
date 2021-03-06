import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Cite Plugin
 */
export default class Cite extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'cite';
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
        this._tag({ name: TagName.CITE, group: TagGroup.FORMAT });
        this._command(TagName.CITE);
        this._formatbar(this._('Citation'), Key.Z);
    }
}
