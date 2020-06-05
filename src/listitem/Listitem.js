import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

/**
 * Listitem Plugin
 */
export default class Listitem extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'listitem';
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
    }
}
