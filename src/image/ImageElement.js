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

        const figure = this.editor.createElement('figure', {class: 'image'});
        const media = this.editor.createElement('img');
        const figcaption = this.editor.createElement('figcaption');
        const a = this.editor.createElement('a', {href: attributes.src});
        const origin = this.editor.window.origin || this.editor.window.location.origin;
        attributes.src = a.origin === origin ? a.pathname : a.href;

        for (let [key, val] of Object.entries(attributes)) {
            media.setAttribute(key, `${val}`);
        }

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
