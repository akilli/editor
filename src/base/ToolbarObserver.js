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

            if (node instanceof HTMLElement && this.editor.toolbar === node.parentElement) {
                node.tabIndex = -1;
                this.keyboard(node);
            }
        }));
    }

    /**
     * Handles click events
     *
     * @private
     * @param {HTMLElement} node
     */
    click(node) {
        node.addEventListener('click', () => this.editor.commands.execute(node.getAttribute('data-command')));
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) {
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = node.parentElement.firstElementChild;
                const last = node.parentElement.lastElementChild;
                const isFirst = node === first;
                const isLast = node === last;

                if (ev.key === 'ArrowLeft' && !isFirst) {
                    prev.focus();
                } else if (ev.key === 'ArrowRight' && !isLast) {
                    next.focus();
                } else if (ev.key === 'Home' || ev.key === 'ArrowRight' && isLast) {
                    first.focus();
                } else if (ev.key === 'End' || ev.key === 'ArrowLeft' && isFirst) {
                    last.focus();
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
