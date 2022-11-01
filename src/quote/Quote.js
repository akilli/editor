import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

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
        this._tag({ name: TagName.Q, group: TagGroup.FORMAT });
        this._command(TagName.Q);
        this._formatbar(this._('Quote'), Key.Q);
    }
}
