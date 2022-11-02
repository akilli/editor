import Base from '../base/Base.js';
import BreakFilter from './BreakFilter.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Break extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'break';
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
            name: TagName.BR,
            group: TagGroup.BREAK,
            empty: true,
        });
        this.editor.filters.add(new BreakFilter(this.editor));
    }
}
