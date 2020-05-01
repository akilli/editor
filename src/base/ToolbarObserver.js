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
            if (node instanceof HTMLButtonElement) {
                this.click(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('button').forEach(button => this.click(button));
            }

            if (node instanceof HTMLElement && this.editor.toolbar.isSameNode(node.parentElement)) {
                node.tabIndex = -1;
                this.keyboard(node);
            }
        }));
    }

    /**
     * Handles click events
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    click(node) {
        node.addEventListener('click', () => this.editor.commands.get(node.getAttribute('data-cmd')).execute())
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
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) {
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
