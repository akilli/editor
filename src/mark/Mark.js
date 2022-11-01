import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

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
        this._tag({ name: TagName.MARK, group: TagGroup.FORMAT });
        this._command(TagName.MARK);
        this._formatbar(this._('mark'), Key.M);
    }
}
