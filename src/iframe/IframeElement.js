import Element from '../editor/Element.js';

/**
 * Iframe Element
 */
export default class IframeElement extends Element {
    /**
     * Creates audio element
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
        attributes.allowfullscreen = 'allowfullscreen';

        const figure = this.editor.createElement('figure', {class: 'iframe'});
        const media = this.editor.createElement('iframe', attributes);
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
