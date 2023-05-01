import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Emphasis extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'emphasis';
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
        this._tag({ name: TagName.EM, group: TagGroup.FORMAT });
        this._command(TagName.EM);
        this._formatbar('emphasized', Key.E);
    }
}
