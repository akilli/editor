import Element from '../base/Element.js';

/**
 * Video Element
 */
export default class VideoElement extends Element {
    /**
     * Initializes a new video element
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'video', 'video');
    }

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

        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {attributes: {class: 'video'}});
        const media = this.editor.createElement('video', {attributes: attributes});
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        figure.appendChild(media);
        figure.appendChild(figcaption);

        return figure;
    }
}
