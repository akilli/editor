import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Mark extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'mark';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({ name: TagName.MARK, group: TagGroup.FORMAT });
        this._command(TagName.MARK);
        this._formatbar('mark', Key.M);
    }
}
