import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SortCommand from './SortCommand.js';
import Sorting from '../base/Sorting.js';

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
        const sortings = {
            [Sorting.FIRST]: this._('Sort to the beginning'),
            [Sorting.PREV]: this._('Sort before previous element'),
            [Sorting.NEXT]: this._('Sort after next element'),
            [Sorting.LAST]: this._('Sort to the end'),
        };
        Object.entries(sortings).forEach(([sorting, label]) => {
            const command = new SortCommand(this.editor, sorting);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }
}
