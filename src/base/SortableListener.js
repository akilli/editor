import Listener from './Listener.js';
import { Key, Position, Sorting } from './enum.js';
import { isKey } from './util.js';

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
     * @return {void}
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
     * @return {void}
     */
    keydown(event) {
        const map = { [Key.UP]: Sorting.UP, [Key.DOWN]: Sorting.DOWN, [Key.HOME]: Sorting.TOP, [Key.END]: Sorting.END };

        if (event.target === event.currentTarget && isKey(event, Object.keys(map), { ctrl: true })) {
            this.editor.dom.sort(event.target, map[event.key]);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Pointer down
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
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
     * @return {void}
     */
    pointermove(event) {
        const element = this.editor.dom.document.elementFromPoint(event.x, event.y);
        this.#sortover();

        if (this.#droppable(event.target, element)) {
            element.setAttribute('data-sortover', '');
        }
    }

    /**
     * Pointer up
     *
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    pointerup(event) {
        if (event.target.hasAttribute('data-sortable')) {
            const element = this.editor.dom.document.elementFromPoint(event.x, event.y);
            this.#sortover();
            event.target.removeAttribute('data-sort');
            event.target.releasePointerCapture(event.pointerId);

            if (this.#droppable(event.target, element)) {
                element.insertAdjacentElement(Position.BEFOREBEGIN, event.target);
            }
        }
    }

    /**
     * Removes editor sortover attribute
     *
     * @return {void}
     */
    #sortover() {
        this.editor.root.querySelectorAll('[data-sortover]').forEach(item => item.removeAttribute('data-sortover'));
    }

    /**
     * Indicates if target element is a potential drop target for given element
     *
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     * @return {boolean}
     */
    #droppable(element, target) {
        return element instanceof HTMLElement
            && target instanceof HTMLElement
            && this.editor.dom.contains(target)
            && ![this.editor.root, element].includes(target)
            && target.hasAttribute('data-sortable')
            && (
                element.parentElement === target.parentElement
                || this.editor.dom.arbitrary(element.parentElement) && this.editor.dom.arbitrary(target.parentElement)
            )
            && this.editor.tags.allowed(target.parentElement, element);
    }
}
