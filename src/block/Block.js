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
        return { api: null, browser: null, css: null };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this.editor.dom.registerElement('app-block', BlockElement);
        this._tag({
            name: 'app-block',
            group: 'block',
            attributes: ['id'],
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new BlockListener(this.editor);

        if (this.editor.config.block.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'block', this.editor.config.block.browser));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor));
        }

        this._command('app-block');
        this._toolbar('Block');
    }
}
