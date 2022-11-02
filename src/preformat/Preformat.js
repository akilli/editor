import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import PreformatFilter from './PreformatFilter.js';
import PreformatListener from './PreformatListener.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Preformat extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'preformat';
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
            name: TagName.PRE,
            group: TagGroup.PREFORMAT,
            children: [TagGroup.BREAK],
            deletable: true,
            editable: true,
            navigable: true,
            enter: TagName.P,
        });
        new PreformatListener(this.editor);
        this._command(TagName.PRE);
        this._toolbar('Preformatted Text');
        this.editor.filters.add(new PreformatFilter(this.editor));
    }
}
