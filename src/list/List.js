import OrderedlistCommand from './OrderedlistCommand.js';
import OrderedlistObserver from './OrderedlistObserver.js';
import Plugin from '../base/Plugin.js';
import UnorderedlistCommand from './UnorderedlistCommand.js';
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
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
            name: 'ul',
            group: 'list',
            children: ['listitem'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
            name: 'li',
            group: 'listitem',
            children: ['break', 'format', 'text'],
            deletable: true,
            editable: true,
            enter: 'li',
            navigable: true,
            sortable: true,
        });
        this.editor.commands.set(new OrderedlistCommand(this.editor));
        this.editor.commands.set(new UnorderedlistCommand(this.editor));
        this.editor.observe(new OrderedlistObserver(this.editor));
        this.editor.observe(new UnorderedlistObserver(this.editor));
    }
}
