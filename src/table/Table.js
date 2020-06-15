import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableListener from './TableListener.js';
import i18n from './i18n.js';

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
        this._tag({name: 'table', group: 'table', deletable: true, navigable: true, sortable: true});
        this._tag({name: 'thead', group: 'tablesection'});
        this._tag({name: 'tbody', group: 'tablesection'});
        this._tag({name: 'tfoot', group: 'tablesection'});
        this._tag({name: 'tr', group: 'tablerow'});
        this._tag({name: 'th', group: 'tablecell', editable: true, empty: true});
        this._tag({name: 'td', group: 'tablecell', editable: true, empty: true});
        this.editor.tags.allow(this.editor.content, 'table');
        this.editor.tags.allow('figure', 'table');
        this.editor.tags.allow('table', 'tablesection');
        this.editor.tags.allow('thead', 'tablerow');
        this.editor.tags.allow('tbody', 'tablerow');
        this.editor.tags.allow('tfoot', 'tablerow');
        this.editor.tags.allow('tr', 'tablecell');
        this.editor.tags.allow('th', 'break', 'format');
        this.editor.tags.allow('td', 'break', 'format');
        new TableListener(this.editor);
        this.editor.filters.add(new TableFilter(this.editor));
        this.editor.dialogs.set(new TableDialog(this.editor));
        this.editor.commands.set(new TableCommand(this.editor));
        this._toolbar('Table');
    }
}
