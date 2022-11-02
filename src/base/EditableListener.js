import Key from './Key.js';
import Listener from './Listener.js';
import TagName from './TagName.js';

/**
 * Editable Listener
 */
export default class EditableListener extends Listener {
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
     * @param {HTMLElement} element
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
     * Handles enter and backspace keydown events
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (Key.isEventFor(event, Key.ENTER, { shift: true }) && !this.editor.tags.allowed(event.target, TagName.BR)) {
            event.preventDefault();
            event.stopPropagation();
        } else if (Key.isEventFor(event, Key.ENTER)) {
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
            Key.isEventFor(event, Key.BACKSPACE) &&
            !event.target.textContent &&
            event.target.hasAttribute('data-deletable')
        ) {
            this.editor.dom.delete(event.target);
            event.preventDefault();
            event.stopPropagation();
        } else if (/^[A-Z]$/.test(event.key) && Key.isEventFor(event, event.key, { alt: true, shift: true })) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.formatbar.querySelector(`${TagName.BUTTON}[data-key=${event.key.toLowerCase()}]`)?.click();
        }
    }

    /**
     * Handles double-click events on format elements
     *
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    dblclick(event) {
        this.editor.dom.selectContents(event.target);
        this.editor.commands.find(event.target.localName)?.execute();
    }
}
