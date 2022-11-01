import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

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
        this._tag({ name: TagName.EM, group: TagGroup.FORMAT });
        this._command(TagName.EM);
        this._formatbar('emphasized', Key.E);
    }
}
