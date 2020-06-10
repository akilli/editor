import Base from '../base/Base.js';
import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';

/**
 * Bold Plugin
 */
export default class Bold extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'bold';
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
        this.editor.tags.create({name: 'b', group: 'format'});
        this.editor.commands.set(new Command(this.editor, 'bold', 'b'));
    }
}
