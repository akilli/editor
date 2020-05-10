import Observer from './Observer.js';

/**
 * Widget Observer
 */
export default class WidgetObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.parentElement instanceof HTMLElement && this.editor.isContent(node.parentElement)) {
                node.tabIndex = 0;
                node.focus();
                this.keyboard(node);
                this.dragndrop(node);
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
            if (!this.editor.document.activeElement.isSameNode(node)) {
                return;
            }

            if (ev.ctrlKey && ev.key === 'Delete') {
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            } else if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) {
                const isFirst = node.parentElement.firstElementChild.isSameNode(node);
                const isLast = node.parentElement.lastElementChild.isSameNode(node);

                if (ev.ctrlKey && ev.key === 'ArrowUp' && !isFirst) {
                    node.previousElementSibling.insertAdjacentHTML('beforebegin', node.outerHTML);
                    node.parentElement.removeChild(node);
                } else if (ev.ctrlKey && ev.key === 'ArrowDown' && !isLast) {
                    node.nextElementSibling.insertAdjacentHTML('afterend', node.outerHTML);
                    node.parentElement.removeChild(node);
                } else if (ev.ctrlKey && (ev.key === 'Home' && !isFirst || ev.key === 'ArrowDown' && isLast)) {
                    node.parentElement.firstElementChild.insertAdjacentHTML('beforebegin', node.outerHTML);
                    node.parentElement.removeChild(node);
                } else if (ev.ctrlKey && (ev.key === 'End' && !isLast || ev.key === 'ArrowUp' && isFirst)) {
                    node.parentElement.lastElementChild.insertAdjacentHTML('afterend', node.outerHTML);
                    node.parentElement.removeChild(node);
                } else if (ev.key === 'ArrowUp' && !isFirst) {
                    node.previousElementSibling.focus();
                } else if (ev.key === 'ArrowDown' && !isLast) {
                    node.nextElementSibling.focus();
                } else if (ev.key === 'Home' || ev.key === 'ArrowDown' && isLast) {
                    node.parentElement.firstElementChild.focus();
                } else if (ev.key === 'End' || ev.key === 'ArrowUp' && isFirst) {
                    node.parentElement.lastElementChild.focus();
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }

    /**
     * Adds drag'n'drop support
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    dragndrop(node) {
        const parentName = 'root';
        const keyName = 'text/x-editor-name';
        const keyHtml = 'text/x-editor-html';
        const toggle = () => {
            const hasDraggable = node.hasAttribute('draggable');

            this.editor.content.querySelectorAll('[draggable]').forEach(item => {
                item.removeAttribute('draggable');

                if (item.hasAttribute('contenteditable')) {
                    item.setAttribute('contenteditable', 'true');
                }
            });

            if (!hasDraggable) {
                node.setAttribute('draggable', 'true');

                if (node.hasAttribute('contenteditable')) {
                    node.setAttribute('contenteditable', 'false');
                }
            }
        };
        const allowDrop = ev => {
            const name = ev.dataTransfer.getData(keyName);

            if (name && this.editor.allowed(name, parentName)) {
                ev.preventDefault();
                node.setAttribute('data-dragover', '');
                ev.dataTransfer.dropEffect = 'move';
            }
        };

        node.addEventListener('dblclick', toggle);
        node.addEventListener('dragstart', ev => {
            ev.dataTransfer.effectAllowed = 'move';
            ev.dataTransfer.setData(keyName, node.tagName.toLowerCase());
            ev.dataTransfer.setData(keyHtml, node.outerHTML);
        });
        node.addEventListener('dragend', ev => {
            if (ev.dataTransfer.dropEffect === 'move') {
                node.parentElement.removeChild(node);
            }

            toggle();
        });
        node.addEventListener('dragenter', allowDrop);
        node.addEventListener('dragover', allowDrop);
        node.addEventListener('dragleave', () => node.removeAttribute('data-dragover'));
        node.addEventListener('drop', ev => {
            const name = ev.dataTransfer.getData(keyName);
            const html = ev.dataTransfer.getData(keyHtml);

            ev.preventDefault();
            node.removeAttribute('data-dragover');

            if (name && this.editor.allowed(name, parentName) && html) {
                node.insertAdjacentHTML('beforebegin', html);
            }
        });
    }
}
