import Base from '../base/Base.js';
import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';

/**
 * Italic Plugin
 */
export default class Italic extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'italic';
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
        this.editor.tags.create({name: 'i', group: 'format'});
        this.editor.commands.set(new Command(this.editor, 'italic', 'i'));
    }
}
