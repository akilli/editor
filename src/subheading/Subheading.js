import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Subheading extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'subheading';
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
        this._toolbar('Subheading');
    }
}
