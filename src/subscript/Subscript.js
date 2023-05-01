import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Subscript extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'subscript';
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
        this._tag({ name: TagName.SUB, group: TagGroup.FORMAT });
        this._command(TagName.SUB);
        this._formatbar('subscript', Key.X);
    }
}
