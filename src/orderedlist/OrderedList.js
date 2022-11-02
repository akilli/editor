import Base from '../base/Base.js';
import List from '../list/List.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class OrderedList extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'orderedlist';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, List];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.OL,
            group: TagGroup.LIST,
            children: [TagGroup.LISTITEM],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.OL);
        this._toolbar('Ordered List');
    }
}
