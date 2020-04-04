import Element from '../editor/Element.js';

/**
 * Image Element
 */
export default class ImageElement extends Element {
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

        const a = this.editor.createElement('a', {href: attributes.src});
        attributes.src = a.origin === this.editor.origin ? a.pathname : a.href;

        const figure = this.editor.createElement('figure', {class: 'image'});
        const media = this.editor.createElement('img', attributes);
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
