import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';
import TableDialog from './TableDialog.js';
import TableElement from './TableElement.js';
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
        const data = this.editor.config.base && i18n[this.editor.config.base.lang] ? i18n[this.editor.config.base.lang] : {};
        this.editor.translators.set(this.name, new Translator(this.name, data));
        this.editor.elements.set(this.name, new TableElement(this.editor));
        this.editor.filters.set(this.name, new TableFilter(this.editor, this.name));
        this.editor.dialogs.set(this.name, new TableDialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
