import Base from '../base/Base.js';
import BlockDialog from './BlockDialog.js';
import BlockElement from './BlockElement.js';
import BlockListener from './BlockListener.js';
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
    static get dependencies() {
        return [Base];
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
        this._translator(i18n);
        this.editor.registerElement('editor-block', BlockElement);
        this._tag({
            name: 'editor-block',
            group: 'block',
            attributes: ['id'],
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'block');
        new BlockListener(this.editor);

        if (this.editor.config.block.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'block', this.editor.config.block.browser));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor));
        }

        this._command('editor-block');
        this._toolbar('Block');
    }
}
