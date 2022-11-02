import Base from '../base/Base.js';
import Break from '../break/Break.js';
import ListListener from './ListListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class List extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'list';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.LI,
            group: TagGroup.LISTITEM,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: TagName.LI,
        });
        new ListListener(this.editor);
    }
}
