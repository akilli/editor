import AbbreviationDialog from './AbbreviationDialog.js';
import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

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
        this._tag({ name: TagName.ABBR, group: TagGroup.FORMAT, attributes: ['title'] });
        this.editor.dialogs.set(new AbbreviationDialog(this.editor));
        this._command(TagName.ABBR);
        this._formatbar('Abbreviation', Key.A);
    }
}
