import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TableCellListener from './TableCellListener.js';
import TableColumnListener from './TableColumnListener.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableListener from './TableListener.js';
import TableRowListener from './TableRowListener.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Table extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'table';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Break, Figure];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.TABLE,
            group: TagGroup.TABLE,
            children: [TagGroup.TABLESECTION],
            deletable: true,
            navigable: true,
        });
        this._tag({
            name: TagName.COLGROUP,
            group: TagGroup.COLGROUP,
            children: [TagGroup.COL],
        });
        this._tag({
            name: TagName.COL,
            group: TagGroup.COL,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._tag(this.#section(TagName.THEAD));
        this._tag(this.#section(TagName.TBODY));
        this._tag(this.#section(TagName.TFOOT));
        this._tag({
            name: TagName.TR,
            group: TagGroup.TABLEROW,
            children: [TagGroup.TABLECELL],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._tag(this.#cell(TagName.TH));
        this._tag(this.#cell(TagName.TD));
        new TableListener(this.editor);
        new TableColumnListener(this.editor);
        new TableRowListener(this.editor);
        new TableCellListener(this.editor);
        this.editor.filters.add(new TableFilter(this.editor));
        this.editor.dialogs.set(new TableDialog(this.editor, this.constructor.name));
        this.editor.commands.set(new TableCommand(this.editor));
        this._toolbar('Table');
    }

    /**
     * Returns table section tag configuration
     *
     * @param {string} name
     * @return {Object.<string, any>}
     */
    #section(name) {
        return {
            name,
            group: TagGroup.TABLESECTION,
            children: [TagGroup.TABLEROW],
        };
    }

    /**
     * Returns table cell tag configuration
     *
     * @param {string} name
     * @return {Object.<string, any>}
     */
    #cell(name) {
        return {
            name,
            group: TagGroup.TABLECELL,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            editable: true,
            empty: true,
        };
    }
}
