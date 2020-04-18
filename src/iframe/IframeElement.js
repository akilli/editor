import Element from '../base/Element.js';

/**
 * Iframe Element
 */
export default class IframeElement extends Element {
    /**
     * Initializes a new iframe element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe', 'iframe');
    }

    /**
     * Creates iframe element
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

        attributes.src = this.editor.url(attributes.src);
        attributes.allowfullscreen = 'allowfullscreen';

        const figure = this.editor.createElement('figure', {class: 'iframe'});
        const media = this.editor.createElement('iframe', attributes);
        const figcaption = this.editor.createElement('figcaption', {}, caption);

        figure.appendChild(media);
        figure.appendChild(figcaption);

        return figure;
    }
}
