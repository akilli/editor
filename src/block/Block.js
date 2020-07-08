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
        this._i18n(i18n);
        this._editor.registerElement('editor-block', BlockElement);
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
        new BlockListener(this._editor);

        if (this._editor.config.block.browser) {
            this._editor.dialogs.set(new BrowserDialog(this._editor, 'block', this._editor.config.block.browser));
        } else {
            this._editor.dialogs.set(new BlockDialog(this._editor));
        }

        this._command('editor-block');
        this._toolbar('Block');
    }
}
