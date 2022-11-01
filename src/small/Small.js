import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Small Plugin
 */
export default class Small extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'small';
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
        this._tag({ name: TagName.SMALL, group: TagGroup.FORMAT });
        this._command(TagName.SMALL);
        this._formatbar('small', Key.W);
    }
}
