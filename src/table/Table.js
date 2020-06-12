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
        this.editor.tags.create({name: 'table', group: 'table', children: ['tablesection'], deletable: true, navigable: true, sortable: true});
        this.editor.tags.allow(this.editor.content, 'table');
        this.editor.tags.allow('figure', 'table');
        this.editor.tags.create({name: 'thead', group: 'tablesection', children: ['tablerow']});
        this.editor.tags.create({name: 'tbody', group: 'tablesection', children: ['tablerow']});
        this.editor.tags.create({name: 'tfoot', group: 'tablesection', children: ['tablerow']});
        this.editor.tags.create({name: 'tr', group: 'tablerow', children: ['tablecell']});
        this.editor.tags.create({name: 'th', group: 'tablecell', children: ['break', 'format'], editable: true, empty: true});
        this.editor.tags.create({name: 'td', group: 'tablecell', children: ['break', 'format'], editable: true, empty: true});
        new TableListener(this.editor);

        if (i18n[this.editor.config.base.lang]) {
            this.editor.i18n.set('table', i18n[this.editor.config.base.lang]);
        }

        this.editor.filters.add(new TableFilter(this.editor));
        this.editor.dialogs.set(new TableDialog(this.editor));
        this.editor.commands.set(new TableCommand(this.editor));
    }
}
