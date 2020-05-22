import DivCommand from './DivCommand.js';
import DivDialog from './DivDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Div Plugin
 */
export default class DivPlugin extends Plugin {
    /**
     * Initializes a new details plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'div');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.registerTag({name: 'div', group: 'section', attributes: ['class'], children: ['block', 'figure'], slotable: true});
        this.registerTranslator(i18n);
        this.editor.dialogs.set(new DivDialog(this.editor));
        this.editor.commands.set(new DivCommand(this.editor));
    }
}