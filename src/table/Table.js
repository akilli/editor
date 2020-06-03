import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableObserver from './TableObserver.js';
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
    init() {
        this.editor.tags.create({
            name: 'table',
            group: 'table',
            children: ['tablesection'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        ['thead', 'tbody', 'tfoot'].forEach(item => this.editor.tags.create({
            name: item,
            group: 'tablesection',
            children: ['tablerow'],
        }));
        this.editor.tags.create({
            name: 'tr',
            group: 'tablerow',
            children: ['tablecell'],
        });
        ['td', 'th'].forEach(item => this.editor.tags.create({
            name: item,
            group: 'tablecell',
            children: ['break', 'format'],
            editable: true,
            empty: true,
        }));
        this.editor.observe(new TableObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.filters.set(new TableFilter(this.editor));
        this.editor.dialogs.set(new TableDialog(this.editor));
        this.editor.commands.set(new TableCommand(this.editor));
    }
}
