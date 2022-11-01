import Base from '../base/Base.js';
import DivisionDialog from './DivisionDialog.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Division Plugin
 */
export default class Division extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'division';
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
        this._tag({
            name: TagName.DIV,
            group: TagGroup.CONTAINER,
            children: [
                TagGroup.AUDIO,
                TagGroup.BLOCK,
                TagGroup.FIGURE,
                TagGroup.IFRAME,
                TagGroup.IMAGE,
                TagGroup.PREFORMAT,
                TagGroup.QUOTE,
                TagGroup.RULE,
                TagGroup.TABLE,
                TagGroup.VIDEO,
            ],
            attributes: ['class'],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this.editor.dialogs.set(new DivisionDialog(this.editor));
        this._command(TagName.DIV);
        this._toolbar(this._('Division'));
    }
}
