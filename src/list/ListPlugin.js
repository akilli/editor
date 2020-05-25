import OrderedlistCommand from './OrderedlistCommand.js';
import UnorderedlistCommand from './UnorderedlistCommand.js';
import Plugin from '../base/Plugin.js';

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
        this.registerTag({name: 'ul', group: 'list', children: ['listitem'], sortable: true})
        this.editor.commands.set(new UnorderedlistCommand(this.editor));
        this.registerTag({name: 'ol', group: 'list', children: ['listitem'], sortable: true})
        this.editor.commands.set(new OrderedlistCommand(this.editor));
        this.registerTag({name: 'li', group: 'listitem', children: ['break', 'format', 'text'], editable: true, enter: 'li', sortable: true});
    }
}
