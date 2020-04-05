import Element from '../editor/Element.js';

/**
 * Blockquote Element
 */
export default class BlockquoteElement extends Element {
    /**
     * Initializes a new blockquote element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'blockquote', 'blockquote');
    }

    /**
     * @param {String} [caption = '']
     */
    create({caption = ''} = {}) {
        const figure = this.editor.createElement('figure', {class: this.name});
        const blockquote = this.editor.createElement(this.tagName);
        const figcaption = this.editor.createElement('figcaption');

        blockquote.appendChild(this.editor.createElement('p'));
        figure.appendChild(blockquote);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
