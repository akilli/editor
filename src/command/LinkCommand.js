import Command from './Command.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let src;

        if (src = this.editor.window.prompt('URL')) {
            const a = document.createElement('a');
            a.setAttribute('src', src);
            this.editor.formatText(a);
        }
    }
}
