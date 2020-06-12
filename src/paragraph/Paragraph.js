import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';

/**
 * Paragraph Plugin
 */
export default class Paragraph extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'paragraph';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'p',
            group: 'paragraph',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'paragraph');
        this.editor.commands.set(new Command(this.editor, 'paragraph', 'p'));
    }
}
