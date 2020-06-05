import Base from '../base/Base.js';
import Listitem from '../listitem/Listitem.js';
import Plugin from '../base/Plugin.js';
import UnorderedlistObserver from './UnorderedlistObserver.js';

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
        return [Base, Listitem];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'ul',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.observe(new UnorderedlistObserver(this.editor));
        this.registerCommand('unorderedlist', 'ul');
    }
}
