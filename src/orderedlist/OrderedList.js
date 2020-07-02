import Base from '../base/Base.js';
import List from '../list/List.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Ordered List Plugin
 */
export default class OrderedList extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'orderedlist';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, List];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: 'ol',
            group: 'list',
            children: ['listitem'],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command('ol');
        this._toolbar('Ordered List');
    }
}
