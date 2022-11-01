import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Strong Plugin
 */
export default class Strong extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strong';
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
        this._tag({ name: TagName.STRONG, group: TagGroup.FORMAT });
        this._command(TagName.STRONG);
        this._formatbar('strongly emphasized', Key.S);
    }
}
