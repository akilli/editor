import ListCommand from './ListCommand.js';
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
        this.registerTag({name: 'ul', group: 'list', children: ['listitem']})
        this.editor.commands.set(new ListCommand(this.editor, 'unorderedlist', 'ul'));
        this.registerTag({name: 'ol', group: 'list', children: ['listitem']})
        this.editor.commands.set(new ListCommand(this.editor, 'orderedlist', 'ol'));
        this.registerTag({name: 'li', group: 'listitem', children: ['break', 'format', 'text'], editable: true, enter: 'li'});
    }
}
