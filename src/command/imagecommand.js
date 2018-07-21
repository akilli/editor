import Command from './command.js';

/**
 * Image Command
 */
export default class ImageCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let url;

        if (url = this.editor.window.prompt('URL')) {
            this.editor.execute('insertimage', url);
        }
    }
}
