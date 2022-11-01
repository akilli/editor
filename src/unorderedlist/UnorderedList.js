import Base from '../base/Base.js';
import List from '../list/List.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Unordered List Plugin
 */
export default class UnorderedList extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'unorderedlist';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, List];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._tag({
            name: TagName.UL,
            group: TagGroup.LIST,
            children: [TagGroup.LISTITEM],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.UL);
        this._toolbar(this._('Unordered List'));
    }
}
