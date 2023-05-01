import Key, { isKey } from './Key.js';
import Listener from './Listener.js';
import Sorting from './Sorting.js';
import TagName from './TagName.js';

export default class SortableListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-sortable')) {
            element.addEventListener('keydown', this);
            element.addEventListener('pointerdown', this);
            element.addEventListener('pointermove', this);
            element.addEventListener('pointerup', this);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        /** @type {Object<Key, Sorting>} */
        const map = {
            [Key.HOME]: Sorting.FIRST,
            [Key.ARROWUP]: Sorting.PREV,
            [Key.ARROWDOWN]: Sorting.NEXT,
            [Key.END]: Sorting.LAST,
        };

        if (event.target === event.currentTarget && isKey(event, Object.keys(map), { ctrl: true })) {
            this.editor.dom.sort(event.target, map[event.key]);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    pointerdown(event) {
        const target = event.target.closest('[data-sortable]');

        if (target && this.editor.dom.contains(target)) {
            target.setAttribute('data-sort', '');
            target.setPointerCapture(event.pointerId);
        }
    }

    /**
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    pointermove(event) {
        const target = event.target.closest('[data-sortable][data-sort]');
        const element = this.editor.dom.document.elementFromPoint(event.x, event.y);
        this.#sortover();

        if (target && this.editor.dom.contains(target) && this.#droppable(target, element)) {
            element.setAttribute('data-sortover', '');
        }
    }

    /**
     * @param {PointerEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    pointerup(event) {
        const target = event.target.closest('[data-sortable][data-sort]');

        if (target && this.editor.dom.contains(target)) {
            const element = this.editor.dom.document.elementFromPoint(event.x, event.y);
            const parent = element.parentElement;
            this.#sortover();
            target.removeAttribute('data-sort');
            target.releasePointerCapture(event.pointerId);

            if (this.#droppable(target, element)) {
                if (target.localName === TagName.COL && parent === target.parentElement) {
                    const t = Array.from(parent.children).indexOf(target);
                    const e = Array.from(parent.children).indexOf(element);
                    const table = parent.parentElement;
                    Array.from(table.rows).forEach((row) => this.editor.dom.insertBefore(row.cells[t], row.cells[e]));
                }

                this.editor.dom.insertBefore(target, element);
            }
        }
    }

    /**
     * Removes editor sortover attribute
     *
     * @return {void}
     */
    #sortover() {
        this.editor.root.querySelectorAll('[data-sortover]').forEach((item) => item.removeAttribute('data-sortover'));
    }

    /**
     * Indicates if target element is a potential drop target for given element
     *
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     * @return {boolean}
     */
    #droppable(element, target) {
        return (
            element instanceof HTMLElement &&
            target instanceof HTMLElement &&
            this.editor.dom.contains(target) &&
            ![this.editor.root, element].includes(target) &&
            target.hasAttribute('data-sortable') &&
            (element.parentElement === target.parentElement ||
                (this.editor.dom.arbitrary(element.parentElement) &&
                    this.editor.dom.arbitrary(target.parentElement))) &&
            this.editor.tags.allowed(target.parentElement, element)
        );
    }
}
