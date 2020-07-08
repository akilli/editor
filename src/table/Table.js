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
        this._tag({
            name: 'table',
            group: 'table',
            children: ['tablesection'],
            deletable: true,
            navigable: true,
        });
        this._tag({
            name: 'thead',
            group: 'tablesection',
            children: ['tablerow'],
        });
        this._tag({
            name: 'tbody',
            group: 'tablesection',
            children: ['tablerow'],
        });
        this._tag({
            name: 'tfoot',
            group: 'tablesection',
            children: ['tablerow'],
        });
        this._tag({
            name: 'tr',
            group: 'tablerow',
            children: ['tablecell'],
        });
        this._tag({
            name: 'th',
            group: 'tablecell',
            children: ['break', 'format'],
            editable: true,
            empty: true,
        });
        this._tag({
            name: 'td',
            group: 'tablecell',
            children: ['break', 'format'],
            editable: true,
            empty: true,
        });
        new TableListener(this._editor);
        this._editor.filters.add(new TableFilter(this._editor));
        this._editor.dialogs.set(new TableDialog(this._editor));
        this._editor.commands.set(new TableCommand(this._editor));
        this._toolbar('Table');
    }
}
