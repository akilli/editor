import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableListener from './TableListener.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Table Plugin
 */
export default class Table extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'table';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break, Figure];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.TABLE,
            group: TagGroup.TABLE,
            children: [TagGroup.TABLESECTION],
            deletable: true,
            navigable: true,
        });
        this._tag({
            name: TagName.THEAD,
            group: TagGroup.TABLESECTION,
            children: [TagGroup.TABLEROW],
        });
        this._tag({
            name: TagName.TBODY,
            group: TagGroup.TABLESECTION,
            children: [TagGroup.TABLEROW],
        });
        this._tag({
            name: TagName.TFOOT,
            group: TagGroup.TABLESECTION,
            children: [TagGroup.TABLEROW],
        });
        this._tag({
            name: TagName.TR,
            group: TagGroup.TABLEROW,
            children: [TagGroup.TABLECELL],
        });
        this._tag({
            name: TagName.TH,
            group: TagGroup.TABLECELL,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            editable: true,
            empty: true,
        });
        this._tag({
            name: TagName.TD,
            group: TagGroup.TABLECELL,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            editable: true,
            empty: true,
        });
        new TableListener(this.editor);
        this.editor.filters.add(new TableFilter(this.editor));
        this.editor.dialogs.set(new TableDialog(this.editor));
        this.editor.commands.set(new TableCommand(this.editor));
        this._toolbar(this._('Table'));
    }
}
