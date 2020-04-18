import Element from '../base/Element.js';

/**
 * Audio Element
 */
export default class AudioElement extends Element {
    /**
     * Initializes a new audio element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'audio', 'audio');
    }

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

        attributes.src = this.editor.url(attributes.src);
        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {class: 'audio'});
        const media = this.editor.createElement('audio', attributes);
        const figcaption = this.editor.createElement('figcaption', {}, caption);

        figure.appendChild(media);
        figure.appendChild(figcaption);

        return figure;
    }
}
