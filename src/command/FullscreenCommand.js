import Command from './Command.js';

/**
 * Fullscreen Command
 */
export default class FullscreenCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        if (this.editor.element.classList.contains('editor-fullscreen')) {
            this.editor.element.classList.remove('editor-fullscreen');
            this.editor.document.documentElement.removeAttribute('data-editor-fullscreen');
        } else {
            this.editor.element.classList.add('editor-fullscreen');
            this.editor.document.documentElement.setAttribute('data-editor-fullscreen', '');
        }
    }
}
