import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import i18n from './i18n.js';

/**
 * Variable Plugin
 */
export default class Variable extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'variable';
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
        this._tag({ name: TagName.VAR, group: TagGroup.FORMAT });
        this._command(TagName.VAR);
        this._formatbar(this._('Variable'), Key.V);
    }
}
