import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Superscript Plugin
 */
export default class Superscript extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'superscript';
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
        this._tag({ name: TagName.SUP, group: TagGroup.FORMAT });
        this._command(TagName.SUP);
        this._formatbar('superscript', Key.Y);
    }
}
