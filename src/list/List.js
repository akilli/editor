import OrderedlistObserver from './OrderedlistObserver.js';
import Plugin from '../base/Plugin.js';
import UnorderedlistObserver from './UnorderedlistObserver.js';

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
        this.editor.tags.create({
            name: 'ul',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
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
        this.editor.observe(new OrderedlistObserver(this.editor));
        this.editor.observe(new UnorderedlistObserver(this.editor));
        this.registerCommand('orderedlist', 'ol');
        this.registerCommand('unorderedlist', 'ul');
    }
}
