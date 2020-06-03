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
export default class Block extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'block';
    }

    /**
     * @inheritDoc
     */
    static get config() {
        return {api: null, browser: null, css: null};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.registerElement('app-block', BlockElement);
        this.editor.tags.create({
            name: 'app-block',
            group: 'block',
            attributes: ['id'],
            deletable: true,
            empty: true,
            navigable: true,
            sortable: true,
        });
        this.registerTranslator(i18n);
        this.editor.observe(new BlockObserver(this.editor));

        if (this.editor.config.block.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'block', this.editor.config.block.browser));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor));
        }

        this.editor.commands.set(new BlockCommand(this.editor));
    }
}