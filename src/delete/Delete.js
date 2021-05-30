import Base from '../base/Base.js';
import DeleteCommand from './DeleteCommand.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Cite Plugin
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
        this._i18n(i18n);
        this.editor.commands.set(new DeleteCommand(this.editor));
        this._focusbar(this._('Delete'), this.constructor.name);
    }
}
