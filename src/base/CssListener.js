import Base from './Base.js';
import Listener from './Listener.js';

/**
 * CSS Listener
 */
export default class CssListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('init', this);
    }

    /**
     * Set translated value of CSS variables
     *
     * @return {void}
     */
    init() {
        const style = this.editor.element.style;
        style.setProperty('--editor-text-root', this.#quote('Gimme some content!'));
        style.setProperty('--editor-text-editable', this.#quote('Gimme some text!'));
        style.setProperty('--editor-text-slot', this.#quote('Focus this slot and gimme some content!'));
    }

    /**
     * Translates given text and adds double quotes around it
     *
     * @param {string} text
     * @return {string}
     */
    #quote(text) {
        return `"${this.editor.translator.translate(Base.name, text)}"`;
    }
}
