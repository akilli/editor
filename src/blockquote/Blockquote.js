import Base from '../base/Base.js';
import BlockquoteFilter from './BlockquoteFilter.js';
import BlockquoteListener from './BlockquoteListener.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Blockquote extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'blockquote';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Break, Figure];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.BLOCKQUOTE,
            group: TagGroup.QUOTE,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            deletable: true,
            editable: true,
            navigable: true,
            enter: TagName.P,
        });
        new BlockquoteListener(this.editor);
        this._command(TagName.BLOCKQUOTE);
        this._toolbar('Blockquote');
        this.editor.filters.add(new BlockquoteFilter(this.editor));
    }
}
