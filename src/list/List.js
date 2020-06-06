import Base from '../base/Base.js';
import ListObserver from './ListObserver.js';
import Plugin from '../base/Plugin.js';

/**
 * List Plugin
 */
export default class List extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'list';
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
        this.editor.tags.create({
            name: 'li',
            group: 'listitem',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            enter: 'li',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.observe(new ListObserver(this.editor));
    }
}
