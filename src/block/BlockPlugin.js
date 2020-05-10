import BlockCommand from './BlockCommand.js';
import BlockDialog from './BlockDialog.js';
import BlockElement from './BlockElement.js';
import BlockObserver from './BlockObserver.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from '../iframe/i18n.js';

/**
 * Block Plugin
 */
export default class BlockPlugin extends Plugin {
    /**
     * Initializes a new block plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'block');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.registerElement('editor-block', BlockElement);
        this.registerTag({name: 'editor-block', group: 'section', attributes: ['id'], empty: true});
        this.registerTranslator(i18n);
        this.editor.observe(new BlockObserver(this.editor));

        if (this.editor.config.block.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'block', this.editor.config.block.browser));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor, 'block'));
        }

        this.editor.commands.set(new BlockCommand(this.editor, 'block', 'editor-block'));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {api: null, browser: null, css: null};
    }
}
