import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Cite Plugin
 */
export default class Cite extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'cite';
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
        this._tag({ name: TagName.CITE, group: TagGroup.FORMAT });
        this._command(TagName.CITE);
        this._formatbar(this._('Citation'), Key.Z);
    }
}
