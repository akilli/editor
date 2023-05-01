import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Code extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'code';
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
        this._tag({ name: TagName.CODE, group: TagGroup.FORMAT });
        this._command(TagName.CODE);
        this._formatbar('Code', Key.C);
    }
}
