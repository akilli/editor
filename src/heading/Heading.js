import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Heading extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'heading';
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
            name: TagName.H2,
            group: TagGroup.HEADING,
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: TagName.P,
        });
        this._command(TagName.H2);
        this._toolbar('Heading');
    }
}
