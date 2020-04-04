import Element from '../editor/Element.js';
import MediaType from './MediaType.js';

/**
 * Media Element
 */
export default class MediaElement extends Element {
    /**
     * Creates media element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     *
     * @return {HTMLElement}
     */
    async create({caption = '', ...attributes} = {}) {
        const mediaType = MediaType.fromElement(this.name);

        if (!attributes.src || !mediaType) {
            throw 'No media element';
        }

        const figure = this.editor.createElement('figure', {class: mediaType.id});
        const media = this.editor.createElement(mediaType.element);
        const figcaption = this.editor.createElement('figcaption');
        const a = this.editor.createElement('a', {href: attributes.src});
        const origin = this.editor.window.origin || this.editor.window.location.origin;
        attributes.src = a.origin === origin ? a.pathname : a.href;

        if (['audio', 'video'].includes(mediaType.id)) {
            attributes.controls = 'controls';
        } else if (mediaType.id === 'iframe') {
            attributes.allowfullscreen = 'allowfullscreen';
        }

        for (let [key, val] of Object.entries(attributes)) {
            media.setAttribute(key, `${val}`);
        }

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
