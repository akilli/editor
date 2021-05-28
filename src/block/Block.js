import Base from '../base/Base.js';
import BlockDialog from './BlockDialog.js';
import BlockElement from './BlockElement.js';
import BlockListener from './BlockListener.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from '../iframe/i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

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
        return { api: undefined, browser: undefined, css: undefined };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this.editor.dom.registerElement(TagName.BLOCK, BlockElement);
        this._tag({
            name: TagName.BLOCK,
            group: TagGroup.BLOCK,
            attributes: ['id'],
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new BlockListener(this.editor);
        const url = this.editor.config.block.browser;

        if (url) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.constructor.name, url));
        } else {
            this.editor.dialogs.set(new BlockDialog(this.editor));
        }

        this._command(TagName.BLOCK);
        this._toolbar('Block');
    }
}
