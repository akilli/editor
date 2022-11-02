import Base from '../base/Base.js';
import DataDialog from './DataDialog.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Data extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'data';
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
        this._tag({ name: TagName.DATA, group: TagGroup.FORMAT, attributes: ['value'] });
        this.editor.dialogs.set(new DataDialog(this.editor));
        this._command(TagName.DATA);
        this._formatbar('Data', Key.J);
    }
}
