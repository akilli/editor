import Element from '../base/Element.js';

/**
 * Image Element
 */
export default class ImageElement extends Element {
    /**
     * Initializes a new audio element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image', 'img');
    }

    /**
     * Creates image element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     *
     * @return {HTMLElement}
     */
    create({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'No media element';
        }

        const figure = this.editor.createElement('figure', {class: 'image'});
        const media = this.editor.createElement('img', attributes);
        const figcaption = this.editor.createElement('figcaption', {}, caption);

        figure.appendChild(media);
        figure.appendChild(figcaption);

        return figure;
    }
}
