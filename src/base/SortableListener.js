import Listener from './Listener.js';

const keyName = 'text/x-editor-name';
const keyHtml = 'text/x-editor-html';

/**
 * Sortable Listener
 */
export default class SortableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        if (event.detail.element.hasAttribute('data-sortable')) {
            event.detail.element.addEventListener('keydown', this);
            event.detail.element.addEventListener('dblclick', this);
            event.detail.element.addEventListener('dragstart', this);
            event.detail.element.addEventListener('dragend', this);
            event.detail.element.addEventListener('dragenter', this);
            event.detail.element.addEventListener('dragover', this);
            event.detail.element.addEventListener('dragleave', this);
            event.detail.element.addEventListener('drop', this);
        }
    }

    /**
     * Handles key combinations for sorting
     *
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
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     */
    dblclick(event) {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();
            this.__toggle(event.target);
        }
    }

    /**
     * Dragstart listener
     *
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
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    dragend(event) {
        if (event.target === event.currentTarget) {
            if (event.dataTransfer.dropEffect === 'move') {
                event.target.parentElement.removeChild(event.target);
            }

            this.__toggle(event.target);
        }
    }

    /**
     * Dragenter listener
     *
     * @param {DragEvent} event
     * @param {HTMLElement} event.target
     */
    dragenter(event) {
        if (event.target === event.currentTarget) {
            const name = event.dataTransfer.getData(keyName);

            if (name && this.editor.tags.allowed(name, event.target.parentElement)) {
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
     * @param {DragEvent} event
     */
    dragover(event) {
        this.dragenter(event);
    }

    /**
     * Dragleave listener
     */
    dragleave() {
        this.editor.content.querySelectorAll('.editor-dragover').forEach(item => {
            item.classList.length > 1 ? item.classList.remove('editor-dragover') : item.removeAttribute('class');
        })
    }

    /**
     * Drop listener
     *
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

            if (name && this.editor.tags.allowed(name, event.target.parentElement) && html) {
                event.target.insertAdjacentHTML('beforebegin', html);
            }
        }
    }

    /**
     * Toggles contenteditable and draggable states
     *
     * @private
     * @param {HTMLElement} element
     */
    __toggle(element) {
        const hasDraggable = element.hasAttribute('draggable');
        this.editor.content.querySelectorAll('[draggable]').forEach(item => {
            item.removeAttribute('draggable');

            if (item.hasAttribute('contenteditable')) {
                item.setAttribute('contenteditable', 'true');
            }
        });

        if (!hasDraggable) {
            element.setAttribute('draggable', 'true');

            if (element.hasAttribute('contenteditable')) {
                element.setAttribute('contenteditable', 'false');
            }
        }
    }
}
