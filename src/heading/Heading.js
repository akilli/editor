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
    init() {
        this.editor.tags.create({
            name: 'h2',
            group: 'heading',
            children: ['text'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
            sortable: true,
        })
        this.registerCommand('heading', 'h2');
    }
}
