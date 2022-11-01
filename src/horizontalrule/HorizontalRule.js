import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Horizontal Rule Plugin
 */
export default class HorizontalRule extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'horizontalrule';
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
        this._toolbar(this._('Horizontal Rule'));
    }
}
