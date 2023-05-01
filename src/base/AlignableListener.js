import Alignment from './Alignment.js';
import Listener from './Listener.js';
import { AlignKeyMap, isAlignKey } from './Key.js';

export default class AlignableListener extends Listener {
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
        if (element.hasAttribute('data-alignable')) {
            element.addEventListener('keydown', this);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (event.target === event.currentTarget && isAlignKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.dom.removeClass(event.target, ...Object.values(Alignment));
            AlignKeyMap[event.key] !== Alignment.NONE && event.target.classList.add(AlignKeyMap[event.key]);
        }
    }
}
