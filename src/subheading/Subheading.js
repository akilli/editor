import Plugin from '../base/Plugin.js';

/**
 * Subheading Plugin
 */
export default class Subheading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subheading';
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'h3',
            group: 'heading',
            children: ['text'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
            sortable: true,
        });
        this.registerCommand('subheading', 'h3');
    }
}
