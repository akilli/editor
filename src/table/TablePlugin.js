import Plugin from '../base/Plugin.js';
import TableCommand from './TableCommand.js';
import TableDialog from './TableDialog.js';
import TableFilter from './TableFilter.js';
import TableObserver from './TableObserver.js';
import Translator from '../base/Translator.js';
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
        this.editor.observe(new TableObserver(this.editor));
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
        this.editor.filters.set(new TableFilter(this.editor, this.name));
        this.editor.dialogs.set(new TableDialog(this.editor, this.name));
        this.editor.commands.set(new TableCommand(this.editor));
    }
}
