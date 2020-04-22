import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableObserver from './TableObserver.js';
import i18n from './i18n.js';

/**
 * Table Plugin
 */
export default class TablePlugin extends Plugin {
    /**
     * Initializes a new table plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'table');
    }

    /**
     * @inheritDoc
     */
    init() {
        const tagName = 'table';
        this.registerTag({name: tagName, group: 'table', children: ['tablesection']});
        this.registerTag({name: 'thead', group: 'tablesection', children: ['tablerow']});
        this.registerTag({name: 'tbody', group: 'tablesection', children: ['tablerow']});
        this.registerTag({name: 'tfoot', group: 'tablesection', children: ['tablerow']});
        this.registerTag({name: 'tr', group: 'tablerow', children: ['tablecell']});
        this.registerTag({name: 'th', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true});
        this.registerTag({name: 'td', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true});
        this.editor.observe(new TableObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.filters.set(new TableFilter(this.editor, this.name));
        this.editor.dialogs.set(new TableDialog(this.editor, this.name));
        this.editor.commands.set(new TableCommand(this.editor, this.name, tagName));
    }
}
