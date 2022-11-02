import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Strong extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'strong';
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
        this._tag({ name: TagName.STRONG, group: TagGroup.FORMAT });
        this._command(TagName.STRONG);
        this._formatbar('strongly emphasized', Key.S);
    }
}
