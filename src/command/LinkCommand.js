import Command from './Command.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let url;

        if (url = this.editor.window.prompt('URL')) {
            this.editor.execute('createlink', url);
        }
    }
}
