import ListitemObserver from './ListitemObserver.js';
import OrderedlistCommand from './OrderedlistCommand.js';
import Plugin from '../base/Plugin.js';
import UnorderedlistCommand from './UnorderedlistCommand.js';

/**
 * List Plugin
 */
export default class ListPlugin extends Plugin {
    /**
     * Initializes a new list plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'list');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({name: 'ul', group: 'list', children: ['listitem'], deletable: true, sortable: true})
        this.editor.commands.set(new UnorderedlistCommand(this.editor));
        this.editor.tags.create({name: 'ol', group: 'list', children: ['listitem'], deletable: true, sortable: true})
        this.editor.commands.set(new OrderedlistCommand(this.editor));
        this.editor.tags.create({name: 'li', group: 'listitem', children: ['break', 'format', 'text'], deletable: true, editable: true, enter: 'li', sortable: true});
        this.editor.observe(new ListitemObserver(this.editor));
    }
}
