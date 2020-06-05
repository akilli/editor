import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

/**
 * Caption Plugin
 */
export default class Caption extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'caption';
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
            name: 'figcaption',
            group: 'caption',
            children: ['format'],
            editable: true,
            enter: 'p',
            navigable: true,
        });
    }
}
