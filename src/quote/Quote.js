import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Quote Plugin
 */
export default class Quote extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'quote';
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
        this._tag({ name: TagName.Q, group: TagGroup.FORMAT });
        this._command(TagName.Q);
        this._formatbar(this._('Quote'), Key.Q);
    }
}
