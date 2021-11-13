import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SortCommand from './SortCommand.js';
import i18n from './i18n.js';
import { Sorting } from '../base/enum.js';

/**
 * Sort Plugin
 */
export default class Sort extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'sort';
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
        const sortings = {
            [Sorting.FIRST]: this._('Sort first'),
            [Sorting.PREV]: this._('Sort previous'),
            [Sorting.NEXT]: this._('Sort next'),
            [Sorting.LAST]: this._('Sort last'),
        };
        Object.entries(sortings).forEach(([sorting, label]) => {
            const command = new SortCommand(this.editor, sorting);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }
}
