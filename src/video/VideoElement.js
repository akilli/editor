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

        const figure = this.editor.createElement('figure', {class: 'video'});
        const media = this.editor.createElement('video');
        const figcaption = this.editor.createElement('figcaption');
        const a = this.editor.createElement('a', {href: attributes.src});
        const origin = this.editor.window.origin || this.editor.window.location.origin;
        attributes.src = a.origin === origin ? a.pathname : a.href;
        attributes.controls = 'controls';

        for (let [key, val] of Object.entries(attributes)) {
            media.setAttribute(key, `${val}`);
        }

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
