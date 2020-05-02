import Command from '../base/Command.js';

/**
 * Format Command
 */
export default class FormatCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        this.editor.format(this.editor.createElement(this.tagName, {attributes: attributes}));
    }
}
