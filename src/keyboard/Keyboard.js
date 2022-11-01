import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Keyboard Plugin
 */
export default class Keyboard extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'keyboard';
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
        this._tag({ name: TagName.KBD, group: TagGroup.FORMAT });
        this._command(TagName.KBD);
        this._formatbar(this._('User Input'), Key.K);
    }
}
