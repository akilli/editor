import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Subheading Plugin
 */
export default class Subheading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subheading';
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
            name: TagName.H3,
            group: TagGroup.HEADING,
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: TagName.P,
        });
        this._command(TagName.H3);
        this._toolbar(this._('Subheading'));
    }
}
