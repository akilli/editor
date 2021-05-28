import AbbreviationDialog from './AbbreviationDialog.js';
import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Abbreviation Plugin
 */
export default class Abbreviation extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'abbreviation';
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
        this._tag({ name: TagName.ABBR, group: TagGroup.FORMAT, attributes: ['title'] });
        this.editor.dialogs.set(new AbbreviationDialog(this.editor));
        this._command(TagName.ABBR);
        this._formatbar(this._('Abbreviation'), Key.A);
    }
}
