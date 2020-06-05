import Base from '../base/Base.js';
import Listitem from '../listitem/Listitem.js';
import OrderedlistObserver from './OrderedlistObserver.js';
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
        return [Base, Listitem];
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
        this.editor.observe(new OrderedlistObserver(this.editor));
        this.registerCommand('orderedlist', 'ol');
    }
}
