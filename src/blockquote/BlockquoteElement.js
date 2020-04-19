import Element from '../base/Element.js';

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
     * Creates blockquote element
     *
     * @param {String} [caption = '']
     */
    create({caption = ''} = {}) {
        const figure = this.editor.createElement('figure', {attributes: {class: 'quote'}});
        const blockquote = this.editor.createElement('blockquote');
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        blockquote.appendChild(this.editor.createElement('p'));
        figure.appendChild(blockquote);
        figure.appendChild(figcaption);

        return figure;
    }
}
