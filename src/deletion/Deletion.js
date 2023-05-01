import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Deletion extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'deletion';
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
        this._tag({ name: TagName.DEL, group: TagGroup.FORMAT });
        this._command(TagName.DEL);
        this._formatbar('Text Deletion', Key.G);
    }
}
