import Element from '../base/Element.js';

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

        attributes.src = this.editor.url(attributes.src);
        Object.assign(attributes, defaultAttributes[this.tagName] || {});

        const figure = this.editor.createElement('figure', {class: this.name});
        const media = this.editor.createElement(this.tagName, attributes);
        const figcaption = this.editor.createElement('figcaption', {}, caption);

        figure.appendChild(media);
        figure.appendChild(figcaption);

        return figure;
    }
}
