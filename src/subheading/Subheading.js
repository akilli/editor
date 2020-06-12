import Base from '../base/Base.js';
import Command from '../base/Command.js';
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
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'h3',
            group: 'heading',
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'heading');
        this.editor.commands.set(new Command(this.editor, 'subheading', 'h3'));
    }
}
