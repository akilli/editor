import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Variable extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'variable';
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
        this._tag({ name: TagName.VAR, group: TagGroup.FORMAT });
        this._command(TagName.VAR);
        this._formatbar('Variable', Key.V);
    }
}
