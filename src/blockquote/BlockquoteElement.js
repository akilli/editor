import Element from '../editor/Element.js';

/**
 * Blockquote Element
 */
export default class BlockquoteElement extends Element {
    /**
     * @param {String} [caption = '']
     */
    create({caption = ''} = {}) {
        const figure = this.editor.createElement('figure', {class: 'quote'});
        const blockquote = this.editor.createElement('blockquote');
        const figcaption = this.editor.createElement('figcaption');

        blockquote.appendChild(this.editor.createElement('p'));
        figure.appendChild(blockquote);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
