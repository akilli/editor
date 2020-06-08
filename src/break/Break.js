import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

/**
 * Break Plugin
 */
export default class Break extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'break';
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
            name: 'br',
            group: 'break',
            empty: true,
        });
    }
}
