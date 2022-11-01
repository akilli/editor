import Base from '../base/Base.js';
import DefinitionDialog from './DefinitionDialog.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Definition Plugin
 */
export default class Definition extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'definition';
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
        this._tag({ name: TagName.DFN, group: TagGroup.FORMAT, attributes: ['title'] });
        this.editor.dialogs.set(new DefinitionDialog(this.editor));
        this._command(TagName.DFN);
        this._formatbar('Definition', Key.D);
    }
}
