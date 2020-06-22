import Listener from './Listener.js';

/**
 * Sortable Listener
 */
export default class SortableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
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
            event.detail.element.addEventListener('pointerdown', this);
            event.detail.element.addEventListener('pointermove', this);
            event.detail.element.addEventListener('pointerup', this);
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
     * Pointer down
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     */
    pointerdown(event) {
        event.target.classList.add('editor-sort');
        event.target.setPointerCapture(event.pointerId);
    }

    /**
     * Pointer move
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     */
    pointermove(event) {
        const element = this.editor.document.elementFromPoint(event.x, event.y);

        if (event.target !== element) {
            this.__sortover();

            if (this.__sortable(element)) {
                element.classList.add('editor-sortover');
            }
        }
    }

    /**
     * Pointer up
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     */
    pointerup(event) {
        const element = this.editor.document.elementFromPoint(event.x, event.y);
        this.__sortover();
        event.target.classList.length > 1 ? event.target.classList.remove('editor-sort') : event.target.removeAttribute('class');
        event.target.releasePointerCapture(event.pointerId);

        if (event.target !== element && this.__sortable(element) && this.editor.tags.allowed(element.parentElement, event.target)) {
            element.insertAdjacentElement('beforebegin', event.target);
        }
    }

    /**
     * Removes editor sortover class
     *
     * @private
     */
    __sortover() {
        Array.from(this.editor.root.getElementsByClassName('editor-sortover')).forEach(item => {
            item.classList.length > 1 ? item.classList.remove('editor-sortover') : item.removeAttribute('class');
        });
    }

    /**
     * Is element sortable
     *
     * @private
     * @param {?Element} element
     * @return {Boolean}
     */
    __sortable(element) {
        return element instanceof HTMLElement
            && element.hasAttribute('data-sortable')
            && this.editor.contains(element)
            && element !== this.editor.root;
    }
}
