import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Emphasis Plugin
 */
export default class Emphasis extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'emphasis';
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
        this._tag({ name: TagName.EM, group: TagGroup.FORMAT });
        this._command(TagName.EM);
        this._formatbar(this._('emphasized'), Key.E);
    }
}
