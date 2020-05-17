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
        if (this.editor.element.classList.contains('editor-fullscreen')) {
            this.editor.element.classList.remove('editor-fullscreen');
        } else {
            this.editor.element.classList.add('editor-fullscreen');
        }
    }
}
