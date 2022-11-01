import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Strikethrough Plugin
 */
export default class Strikethrough extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strikethrough';
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
        this._tag({ name: TagName.S, group: TagGroup.FORMAT });
        this._command(TagName.S);
        this._formatbar('strikethrough', Key.R);
    }
}
