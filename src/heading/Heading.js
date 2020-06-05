import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

/**
 * Heading Plugin
 */
export default class Heading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'heading';
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
            name: 'h2',
            group: 'heading',
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        })
        this.registerCommand('heading', 'h2');
    }
}
