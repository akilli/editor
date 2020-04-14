import Command from '../editor/Command.js';
import Plugin from '../editor/Plugin.js';
import TableDialog from './TableDialog.js';
import TableElement from './TableElement.js';
import TableFilter from './TableFilter.js';
import TableObserver from './TableObserver.js';

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
        this.editor.observe(new TableObserver(this.editor, 'table'));
        this.editor.elements.set(this.name, new TableElement(this.editor));
        this.editor.filters.set(this.name, new TableFilter(this.editor, this.name));
        this.editor.dialogs.set(this.name, new TableDialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
