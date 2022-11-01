import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Deletion Plugin
 */
export default class Deletion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'deletion';
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
        this._tag({ name: TagName.DEL, group: TagGroup.FORMAT });
        this._command(TagName.DEL);
        this._formatbar('Text Deletion', Key.G);
    }
}
