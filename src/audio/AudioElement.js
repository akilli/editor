import Element from '../editor/Element.js';

/**
 * Audio Element
 */
export default class AudioElement extends Element {
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
        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {class: 'audio'});
        const media = this.editor.createElement('audio', attributes);
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(media);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        return figure;
    }
}
