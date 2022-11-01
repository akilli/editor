import Base from '../base/Base.js';
import DataDialog from './DataDialog.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Data Plugin
 */
export default class Data extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'data';
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
        this._tag({ name: TagName.DATA, group: TagGroup.FORMAT, attributes: ['value'] });
        this.editor.dialogs.set(new DataDialog(this.editor));
        this._command(TagName.DATA);
        this._formatbar('Data', Key.J);
    }
}
