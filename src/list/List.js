import Base from '../base/Base.js';
import Break from '../break/Break.js';
import ListListener from './ListListener.js';
import Plugin from '../base/Plugin.js';

/**
 * List Plugin
 */
export default class List extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'list';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._tag({
            name: 'li',
            group: 'listitem',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            enter: 'li',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new ListListener(this.editor);
    }
}
