import Base from '../base/Base.js';
import DeleteCommand from './DeleteCommand.js';
import Plugin from '../base/Plugin.js';

export default class Delete extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'delete';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this.editor.commands.set(new DeleteCommand(this.editor));
        this._focusbar('Delete', this.constructor.name);
    }
}
