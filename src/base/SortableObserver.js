import Observer from './Observer.js';

/**
 * Sortable Observer
 */
export default class SortableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        const names = this.editor.tags.filterKeys(tag => tag.sortable);
        const selector = names.join(', ');

        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (names.includes(node.localName)) {
                    this.init(node);
                }

                if (selector) {
                    node.querySelectorAll(selector).forEach(item => this.init(item));
                }
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
            if (ev.target === node && ev.ctrlKey && ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) {
                const parent = node.parentElement;
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = parent.firstElementChild;
                const last = parent.lastElementChild;
                const isFirst = node === first;
                const isLast = node === last;

                if (ev.key === 'ArrowUp' && !isFirst && this.editor.tags.isSortable(prev)) {
                    prev.insertAdjacentHTML('beforebegin', node.outerHTML);
                    parent.removeChild(node);
                } else if (ev.key === 'ArrowDown' && !isLast && this.editor.tags.isSortable(next)) {
                    next.insertAdjacentHTML('afterend', node.outerHTML);
                    parent.removeChild(node);
                } else if ((ev.key === 'Home' && !isFirst || ev.key === 'ArrowDown' && isLast) && this.editor.tags.isSortable(first)) {
                    first.insertAdjacentHTML('beforebegin', node.outerHTML);
                    parent.removeChild(node);
                } else if ((ev.key === 'End' && !isLast || ev.key === 'ArrowUp' && isFirst) && this.editor.tags.isSortable(last)) {
                    last.insertAdjacentHTML('afterend', node.outerHTML);
                    parent.removeChild(node);
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
        const cleanup = () => this.editor.content.querySelectorAll('.editor-dragover').forEach(item => {
                item.classList.length > 1 ? item.classList.remove('editor-dragover') : item.removeAttribute('class');
        });
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
            if (ev.target === node) {
                const name = ev.dataTransfer.getData(keyName);

                if (name && this.editor.tags.isAllowed(name, node.parentElement)) {
                    ev.preventDefault();
                    ev.cancelBubble = true;
                    node.classList.add('editor-dragover');
                    ev.dataTransfer.dropEffect = 'move';
                }
            }
        };

        node.addEventListener('dblclick', ev => {
            if (ev.target === node) {
                ev.preventDefault();
                ev.cancelBubble = true;
                toggle();
            }
        });
        node.addEventListener('dragstart', ev => {
            if (ev.target === node) {
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData(keyName, node.localName);
                ev.dataTransfer.setData(keyHtml, node.outerHTML);
            }
        });
        node.addEventListener('dragend', ev => {
            if (ev.target === node) {
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

            if (ev.target === node) {
                const name = ev.dataTransfer.getData(keyName);
                const html = ev.dataTransfer.getData(keyHtml);
                ev.preventDefault();
                ev.cancelBubble = true;

                if (name && this.editor.tags.isAllowed(name, node.parentElement) && html) {
                    node.insertAdjacentHTML('beforebegin', html);
                }
            }
        });
    }
}
