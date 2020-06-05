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
