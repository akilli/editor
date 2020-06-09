import Base from '../base/Base.js';
import List from '../list/List.js';
import Plugin from '../base/Plugin.js';
import UnorderedlistListener from './UnorderedlistListener.js';

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
        this.editor.tags.create({
            name: 'ul',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new UnorderedlistListener(this.editor);
        this.registerCommand('unorderedlist', 'ul');
    }
}
