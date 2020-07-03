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
        if (event.target.hasAttribute('data-sortable')) {
            event.target.setAttribute('data-sort', '');
            event.target.setPointerCapture(event.pointerId);
        }
    }

    /**
     * Pointer move
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     */
    pointermove(event) {
        const element = this.editor.document.elementFromPoint(event.x, event.y);
        this.__sortover();

        if (this.__droppable(event.target, element)) {
            element.setAttribute('data-sortover', '');
        }
    }

    /**
     * Pointer up
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     */
    pointerup(event) {
        if (event.target.hasAttribute('data-sortable')) {
            const element = this.editor.document.elementFromPoint(event.x, event.y);
            this.__sortover();
            event.target.removeAttribute('data-sort');
            event.target.releasePointerCapture(event.pointerId);

            if (this.__droppable(event.target, element)) {
                element.insertAdjacentElement('beforebegin', event.target);
            }
        }
    }

    /**
     * Removes editor sortover attribute
     *
     * @private
     */
    __sortover() {
        this.editor.root.querySelectorAll('[data-sortover]').forEach(item => item.removeAttribute('data-sortover'));
    }

    /**
     * Indicates if target element is a potential drop target for given element
     *
     * @private
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     * @return {Boolean}
     */
    __droppable(element, target) {
        return element instanceof HTMLElement
            && target instanceof HTMLElement
            && this.editor.contains(target)
            && ![this.editor.root, element].includes(target)
            && target.hasAttribute('data-sortable')
            && (
                element.parentElement === target.parentElement
                || this.editor.arbitrary(element.parentElement) && this.editor.arbitrary(target.parentElement)
            )
            && this.editor.tags.allowed(target.parentElement, element);
    }
}
