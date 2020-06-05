import Command from '../base/Command.js';

/**
 * Fullscreen Command
 */
export default class FullscreenCommand extends Command {
    /**
     * Initializes a new fullscreen command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'fullscreen');
    }

    /**
     * @inheritDoc
     */
    execute() {
        this.editor.element.classList.toggle('editor-fullscreen');
    }
}
