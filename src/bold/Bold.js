import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Bold Plugin
 */
export default class Bold extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'bold';
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
        this._tag({ name: TagName.B, group: TagGroup.FORMAT });
        this._command(TagName.B);
        this._formatbar(this._('bold'), Key.B);
    }
}
