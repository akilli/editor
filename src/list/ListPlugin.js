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
        ['ul', 'ol'].forEach(item => this.registerTag({name: item, group: 'list', children: ['listitem']}));
        this.registerTag({name: 'li', group: 'listitem', children: ['break', 'format', 'text'], editable: true, enter: 'li'});
        this.editor.commands.set(new ListCommand(this.editor, 'orderedlist', 'ol'));
        this.editor.commands.set(new ListCommand(this.editor, 'unorderedlist', 'ul'));
    }
}
