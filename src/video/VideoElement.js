import Element from '../editor/Element.js';

/**
 * Video Element
 */
export default class VideoElement extends Element {
    /**
     * Creates video element
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
        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {class: 'video'});
        const media = this.editor.createElement('video', attributes);
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
