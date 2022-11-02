import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SortCommand from './SortCommand.js';
import Sorting from '../base/Sorting.js';

export default class Sort extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'sort';
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
        const sortings = {
            [Sorting.FIRST]: 'Sort to the beginning',
            [Sorting.PREV]: 'Sort before previous element',
            [Sorting.NEXT]: 'Sort after next element',
            [Sorting.LAST]: 'Sort to the end',
        };
        Object.entries(sortings).forEach(([sorting, label]) => {
            const command = new SortCommand(this.editor, sorting);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }
}
