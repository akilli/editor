import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import i18n from './i18n.js';
import { TagName } from '../base/enum.js';

/**
 * Underline Plugin
 */
export default class Underline extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'underline';
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
        this._tag({ name: TagName.U, group: TagGroup.FORMAT });
        this._command(TagName.U);
        this._formatbar(this._('underline'), Key.U);
    }
}
