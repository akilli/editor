import Observer from './Observer.js';

/**
 * Toolbar Observer
 */
export default class ToolbarObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            let cmd;

            if (node instanceof HTMLElement && (cmd = node.getAttribute('data-cmd'))) {
                node.addEventListener('click', () => {
                    if (!this.editor.commands.has(cmd)) {
                        throw 'Invalid argument';
                    } else if (!this.editor.window.getSelection().containsNode(this.editor.content, true)) {
                        this.editor.content.focus();
                    }

                    this.editor.commands.get(cmd).execute();
                });
            }
        }));
    }
}
