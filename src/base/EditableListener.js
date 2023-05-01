import Listener from './Listener.js';
import TagName from './TagName.js';
import { Key, isFormatKey, isKey } from './Key.js';

export default class EditableListener extends Listener {
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
        if (element.contentEditable === 'true') {
            element.addEventListener('keydown', this);
        } else if (element.parentElement.contentEditable === 'true') {
            element.addEventListener('dblclick', this);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (isKey(event, Key.ENTER, { shift: true }) && !this.editor.tags.allowed(event.target, TagName.BR)) {
            event.preventDefault();
            event.stopPropagation();
        } else if (isKey(event, Key.ENTER)) {
            event.preventDefault();
            event.stopPropagation();
            const enter = this.editor.tags.get(event.target)?.enter;

            if (enter) {
                if (event.target.textContent.trim() || !event.target.hasAttribute('data-deletable')) {
                    const sibling = this.editor.dom.closest(event.target, enter);

                    if (sibling) {
                        this.editor.dom.insertAfter(this.editor.dom.createElement(enter), sibling);
                    }
                } else if (!(event.target instanceof HTMLParagraphElement)) {
                    const sibling = this.editor.dom.closest(event.target, TagName.P);

                    if (sibling) {
                        this.editor.dom.insertAfter(this.editor.dom.createElement(TagName.P), sibling);
                    }

                    event.target.parentElement.removeChild(event.target);
                }
            }
        } else if (
            isKey(event, Key.BACKSPACE) &&
            !event.target.textContent &&
            event.target.hasAttribute('data-deletable')
        ) {
            this.editor.dom.delete(event.target);
            event.preventDefault();
            event.stopPropagation();
        } else if (isFormatKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.formatbar.querySelector(`${TagName.BUTTON}[data-key=${event.key.toLowerCase()}]`)?.click();
        }
    }

    /**
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    dblclick({ target }) {
        this.editor.dom.selectContents(target);
        this.editor.commands.findByTagName(target.localName)?.execute();
    }
}
