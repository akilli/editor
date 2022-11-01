import Base from '../base/Base.js';
import DeleteCommand from './DeleteCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Delete Plugin
 */
export default class Delete extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'delete';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new DeleteCommand(this.editor));
        this._focusbar('Delete', this.constructor.name);
    }
}
