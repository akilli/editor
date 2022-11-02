import Base from '../base/Base.js';
import BlockDialog from './BlockDialog.js';
import BlockElement from './BlockElement.js';
import BlockListener from './BlockListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Block extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'block';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @type {Object.<string, any>}
     */
    static get config() {
        return { api: undefined, browser: undefined, css: undefined };
    }

    /**
     * @return {void}
     */
    init() {
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
        this.editor.dialogs.set(new BlockDialog(this.editor, this.editor.config.block.browser));
        this._command(TagName.BLOCK);
        this._toolbar('Block');
    }
}
