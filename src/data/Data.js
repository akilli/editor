import Base from '../base/Base.js';
import DataDialog from './DataDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

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
        this._i18n(i18n);
        this._tag({ name: TagName.DATA, group: TagGroup.FORMAT, attributes: ['value'] });
        this.editor.dialogs.set(new DataDialog(this.editor));
        this._command(TagName.DATA);
        this._formatbar(this._('Data'), Key.J);
    }
}
