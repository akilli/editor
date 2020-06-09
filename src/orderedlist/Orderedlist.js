import Base from '../base/Base.js';
import List from '../list/List.js';
import OrderedlistListener from './OrderedlistListener.js';
import Plugin from '../base/Plugin.js';

/**
 * Orderedlist Plugin
 */
export default class Orderedlist extends Plugin {
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
        this.editor.tags.create({
            name: 'ol',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new OrderedlistListener(this.editor);
        this.registerCommand('orderedlist', 'ol');
    }
}
