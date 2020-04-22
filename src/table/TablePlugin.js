import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableObserver from './TableObserver.js';
import Tag from '../base/Tag.js';
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
        this.editor.tags.set(new Tag({name: tagName, group: 'table', children: ['tablesection']}));
        this.editor.tags.set(new Tag({name: 'thead', group: 'tablesection', children: ['tablerow']}));
        this.editor.tags.set(new Tag({name: 'tbody', group: 'tablesection', children: ['tablerow']}));
        this.editor.tags.set(new Tag({name: 'tfoot', group: 'tablesection', children: ['tablerow']}));
        this.editor.tags.set(new Tag({name: 'tr', group: 'tablerow', children: ['tablecell']}));
        this.editor.tags.set(new Tag({name: 'th', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true}));
        this.editor.tags.set(new Tag({name: 'td', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true}));
        this.editor.observe(new TableObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.filters.set(new TableFilter(this.editor, this.name));
        this.editor.dialogs.set(new TableDialog(this.editor, this.name));
        this.editor.commands.set(new TableCommand(this.editor, this.name, tagName));
    }
}
