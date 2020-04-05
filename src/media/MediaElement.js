import Element from '../editor/Element.js';

/**
 * Default attributes
 */
const defaultAttributes = {
    audio: {controls: 'controls'},
    iframe: {allowfullscreen: 'allowfullscreen'},
    video: {controls: 'controls'},
};

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
    create({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'No media element';
        }

        const a = this.editor.createElement('a', {href: attributes.src});
        attributes.src = a.origin === this.editor.origin ? a.pathname : a.href;
        Object.assign(attributes, defaultAttributes[this.tagName] || {});

        const figure = this.editor.createElement('figure', {class: this.name});
        const media = this.editor.createElement(this.tagName, attributes);
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
