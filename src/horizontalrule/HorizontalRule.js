import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class HorizontalRule extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'horizontalrule';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.HR,
            group: TagGroup.RULE,
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.HR);
        this._toolbar('Horizontal Rule');
    }
}
