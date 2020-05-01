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
            if (node instanceof HTMLElement) {
                let cmd;
                let command;

                if ((cmd = node.getAttribute('data-cmd')) && (command = this.editor.commands.get(cmd))) {
                    node.addEventListener('click', () => command.execute());
                }

                if (this.editor.toolbar.isSameNode(node.parentElement)) {
                    node.tabIndex = -1;
                    this.keyboard(node);
                }
            }
        }));
    }

    /**
     * Handles keyboard events
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (this.editor.document.activeElement.isSameNode(node) && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) {
                if (ev.key === 'ArrowLeft') {
                    node.previousElementSibling ? node.previousElementSibling.focus() : node.parentElement.lastElementChild.focus();
                } else if (ev.key === 'ArrowRight') {
                    node.nextElementSibling ? node.nextElementSibling.focus() : node.parentElement.firstElementChild.focus();
                } else if (ev.key === 'Home') {
                    node.parentElement.firstElementChild.focus();
                } else if (ev.key === 'End') {
                    node.parentElement.lastElementChild.focus();
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
