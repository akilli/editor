import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import TimeDialog from './TimeDialog.js';
import { Key } from '../base/Key.js';

export default class Time extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'time';
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
        this._tag({ name: TagName.TIME, group: TagGroup.FORMAT, attributes: ['datetime'] });
        this.editor.dialogs.set(new TimeDialog(this.editor, this.constructor.name));
        this._command(TagName.TIME);
        this._formatbar('Time', Key.T);
    }
}
