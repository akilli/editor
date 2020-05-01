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
            let command;

            if (node instanceof HTMLElement && (cmd = node.getAttribute('data-cmd')) && (command = this.editor.commands.get(cmd))) {
                node.addEventListener('click', () => command.execute());
            }
        }));
    }
}
