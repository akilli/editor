import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import TimeDialog from './TimeDialog.js';

/**
 * Time Plugin
 */
export default class Time extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'time';
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
        this._tag({ name: TagName.TIME, group: TagGroup.FORMAT, attributes: ['datetime'] });
        this.editor.dialogs.set(new TimeDialog(this.editor));
        this._command(TagName.TIME);
        this._formatbar('Time', Key.T);
    }
}
