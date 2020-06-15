import Base from '../base/Base.js';
import List from '../list/List.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Unorderedlist Plugin
 */
export default class Unorderedlist extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'unorderedlist';
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
        this._translator(i18n);
        this._tag({
            name: 'ul',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'list');
        this._command('ul');
        this._toolbar('Unordered List');
    }
}
