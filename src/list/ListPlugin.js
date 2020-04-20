import ListCommand from './ListCommand.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';

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
        this.editor.tags.set(new Tag({name: 'ul', group: 'list', children: ['listitem']}));
        this.editor.tags.set(new Tag({name: 'ol', group: 'list', children: ['listitem']}));
        this.editor.tags.set(new Tag({name: 'li', group: 'listitem', children: ['break', 'text'], editable: true, enter: 'li'}));
        this.editor.commands.set(new ListCommand(this.editor, 'orderedlist', 'ol'));
        this.editor.commands.set(new ListCommand(this.editor, 'unorderedlist', 'ul'));
    }
}
