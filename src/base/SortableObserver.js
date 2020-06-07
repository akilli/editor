import Observer from './Observer.js';

const keyName = 'text/x-editor-name';
const keyHtml = 'text/x-editor-html';

/**
 * Sortable Observer
 */
export default class SortableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.hasAttribute('data-sortable')) {
                    this.init(node);
                }

                node.querySelectorAll('[data-sortable]').forEach(item => this.init(item));
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
        node.addEventListener('keydown', this);
        node.addEventListener('dblclick', this);
        node.addEventListener('dragstart', this);
        node.addEventListener('dragend', this);
        node.addEventListener('dragenter', this);
        node.addEventListener('dragover', this);
        node.addEventListener('dragleave', this);
        node.addEventListener('drop', this);
    }

    /**
     * Handles key combinations for sorting
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (event.target === event.currentTarget && this.editor.isKey(event, ['ArrowUp', 'ArrowDown', 'Home', 'End'], {ctrl: true})) {
            const parent = event.target.parentElement;
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = parent.firstElementChild;
            const last = parent.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === 'ArrowUp' && !isFirst && prev.hasAttribute('data-sortable')) {
                prev.insertAdjacentHTML('beforebegin', event.target.outerHTML);
                parent.removeChild(event.target);
            } else if (event.key === 'ArrowDown' && !isLast && next.hasAttribute('data-sortable')) {
                next.insertAdjacentHTML('afterend', event.target.outerHTML);
                parent.removeChild(event.target);
            } else if ((event.key === 'Home' && !isFirst || event.key === 'ArrowDown' && isLast) && first.hasAttribute('data-sortable')) {
                first.insertAdjacentHTML('beforebegin', event.target.outerHTML);
                parent.removeChild(event.target);
            } else if ((event.key === 'End' && !isLast || event.key === 'ArrowUp' && isFirst) && last.hasAttribute('data-sortable')) {
                last.insertAdjacentHTML('afterend', event.target.outerHTML);
                parent.removeChild(event.target);
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Doubleclick listener
     *
     * @private
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     */
    dblclick(event) {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();
            this.toggle(event.target);
        }
    }

    /**
     * Dragstart listener
     *
     * @private
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    dragstart(event) {
        if (event.target === event.currentTarget) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData(keyName, event.target.localName);
            event.dataTransfer.setData(keyHtml, event.target.outerHTML);
        }
    }

    /**
     * Dragend listener
     *
     * @private
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    dragend(event) {
        if (event.target === event.currentTarget) {
            if (event.dataTransfer.dropEffect === 'move') {
                event.target.parentElement.removeChild(event.target);
            }

            this.toggle(event.target);
        }
    }

    /**
     * Dragenter listener
     *
     * @private
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    dragenter(event) {
        if (event.target === event.currentTarget) {
            const name = event.dataTransfer.getData(keyName);

            if (name && this.editor.tags.isAllowed(name, event.target.parentElement)) {
                event.preventDefault();
                event.stopPropagation();
                event.target.classList.add('editor-dragover');
                event.dataTransfer.dropEffect = 'move';
            }
        }
    }

    /**
     * Dragover listener
     *
     * @private
     * @param {DragEvent} event
     */
    dragover(event) {
        this.dragenter(event);
    }

    /**
     * Dragleave listener
     *
     * @private
     */
    dragleave() {
        this.editor.content.querySelectorAll('.editor-dragover').forEach(item => {
            item.classList.length > 1 ? item.classList.remove('editor-dragover') : item.removeAttribute('class');
        })
    }

    /**
     * Drop listener
     *
     * @private
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    drop(event) {
        this.dragleave();

        if (event.target === event.currentTarget) {
            const name = event.dataTransfer.getData(keyName);
            const html = event.dataTransfer.getData(keyHtml);
            event.preventDefault();
            event.stopPropagation();

            if (name && this.editor.tags.isAllowed(name, event.target.parentElement) && html) {
                event.target.insertAdjacentHTML('beforebegin', html);
            }
        }
    }

    /**
     * Toggles contenteditable and draggable states
     *
     * @private
     * @param {HTMLElement} node
     */
    toggle(node) {
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
    }
}
