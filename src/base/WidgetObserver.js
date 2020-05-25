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
            if (node instanceof HTMLElement) {
                if (this.sortable(node)) {
                    this.init(node);
                }

                Array.from(node.children).forEach(child => {
                    if (this.sortable(child)) {
                        this.init(child);
                    }
                });
            }
        }));
    }

    /**
     * Initializes element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.tabIndex = 0;
        node.focus();
        this.keyboard(node);
        this.dragndrop(node);
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (!this.editor.document.activeElement.isSameNode(node)) {
                return;
            }

            const parent = node.parentElement

            if (ev.ctrlKey && ev.key === 'Delete') {
                parent.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            } else if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) {
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = parent.firstElementChild;
                const last = parent.lastElementChild;
                const isFirst = first.isSameNode(node);
                const isLast = last.isSameNode(node);

                if (ev.ctrlKey && ev.key === 'ArrowUp' && !isFirst && this.sortable(prev)) {
                    prev.insertAdjacentHTML('beforebegin', node.outerHTML);
                    parent.removeChild(node);
                } else if (ev.ctrlKey && ev.key === 'ArrowDown' && !isLast && this.sortable(next)) {
                    next.insertAdjacentHTML('afterend', node.outerHTML);
                    parent.removeChild(node);
                } else if (ev.ctrlKey && (ev.key === 'Home' && !isFirst || ev.key === 'ArrowDown' && isLast) && this.sortable(first)) {
                    first.insertAdjacentHTML('beforebegin', node.outerHTML);
                    parent.removeChild(node);
                } else if (ev.ctrlKey && (ev.key === 'End' && !isLast || ev.key === 'ArrowUp' && isFirst) && this.sortable(last)) {
                    last.insertAdjacentHTML('afterend', node.outerHTML);
                    parent.removeChild(node);
                } else if (ev.key === 'ArrowUp' && !isFirst) {
                    prev.focus();
                } else if (ev.key === 'ArrowDown' && !isLast) {
                    next.focus();
                } else if (ev.key === 'Home' || ev.key === 'ArrowDown' && isLast) {
                    first.focus();
                } else if (ev.key === 'End' || ev.key === 'ArrowUp' && isFirst) {
                    last.focus();
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
     * @param {HTMLElement} node
     */
    dragndrop(node) {
        const keyName = 'text/x-editor-name';
        const keyHtml = 'text/x-editor-html';
        const parentName = node.parentElement.tagName.toLowerCase();
        const cleanup = () => {
            this.editor.content.querySelectorAll('.editor-dragover').forEach(item => {
                item.classList.length > 1 ? item.classList.remove('editor-dragover') : item.removeAttribute('class');
            });
        };
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
            if (ev.target.isSameNode(node)) {
                const name = ev.dataTransfer.getData(keyName);

                if (name && this.editor.allowed(name, parentName)) {
                    ev.preventDefault();
                    ev.cancelBubble = true;
                    node.classList.add('editor-dragover');
                    ev.dataTransfer.dropEffect = 'move';
                }
            }
        };

        node.addEventListener('dblclick', ev => {
            if (ev.target.isSameNode(node)) {
                ev.preventDefault();
                ev.cancelBubble = true;
                toggle();
            }
        });
        node.addEventListener('dragstart', ev => {
            if (ev.target.isSameNode(node)) {
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData(keyName, node.tagName.toLowerCase());
                ev.dataTransfer.setData(keyHtml, node.outerHTML);
            }
        });
        node.addEventListener('dragend', ev => {
            if (ev.target.isSameNode(node)) {
                if (ev.dataTransfer.dropEffect === 'move') {
                    node.parentElement.removeChild(node);
                }

                toggle();
            }
        });
        node.addEventListener('dragenter', allowDrop);
        node.addEventListener('dragover', allowDrop);
        node.addEventListener('dragleave', cleanup);
        node.addEventListener('drop', ev => {
            cleanup();

            if (ev.target.isSameNode(node)) {
                const name = ev.dataTransfer.getData(keyName);
                const html = ev.dataTransfer.getData(keyHtml);
                ev.preventDefault();
                ev.cancelBubble = true;

                if (name && this.editor.allowed(name, parentName) && html) {
                    node.insertAdjacentHTML('beforebegin', html);
                }
            }
        });
    }

    /**
     * Indicates if element is sortable
     *
     * @private
     * @param {HTMLElement} node
     * @return {Boolean}
     */
    sortable(node) {
        const tag = this.editor.tags.get(node.tagName.toLowerCase());

        return tag && tag.sortable;
    }
}
