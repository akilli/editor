import BlockCommand from './BlockCommand.js';
import BlockDialog from './BlockDialog.js';
import BlockElement from './BlockElement.js';
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
        const tagName = 'editor-block';
        this.editor.registerElement(tagName, BlockElement);
        this.registerTag({name: tagName, group: 'section', attributes: ['id'], empty: true});
        this.registerTranslator(i18n);

        if (this.editor.config[this.name].browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.name, this.editor.config[this.name].browser));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor, this.name));
        }

        this.editor.commands.set(new BlockCommand(this.editor, this.name, tagName));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {api: null, browser: null, css: null};
    }
}
