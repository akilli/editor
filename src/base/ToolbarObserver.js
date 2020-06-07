import Observer from './Observer.js';

/**
 * Toolbar Observer
 */
export default class ToolbarObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.hasAttribute('data-command')) {
                    this.click(node);
                }

                if (this.editor.toolbar === node.parentElement) {
                    node.tabIndex = -1;
                    this.keyboard(node);
                }

                node.querySelectorAll('[data-command]').forEach(item => this.click(item));
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
        node.addEventListener('keydown', event => {
            if (this.editor.isKey(event, ['ArrowLeft', 'ArrowRight', 'Home', 'End'])) {
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = node.parentElement.firstElementChild;
                const last = node.parentElement.lastElementChild;
                const isFirst = node === first;
                const isLast = node === last;

                if (event.key === 'ArrowLeft' && !isFirst) {
                    prev.focus();
                } else if (event.key === 'ArrowRight' && !isLast) {
                    next.focus();
                } else if (event.key === 'Home' || event.key === 'ArrowRight' && isLast) {
                    first.focus();
                } else if (event.key === 'End' || event.key === 'ArrowLeft' && isFirst) {
                    last.focus();
                }

                event.preventDefault();
                event.stopPropagation();
            }
        });
    }
}
