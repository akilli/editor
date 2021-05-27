import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import PreformatFilter from './PreformatFilter.js';
import PreformatListener from './PreformatListener.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Preformat Plugin
 */
export default class Preformat extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'preformat';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break, Figure];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
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
