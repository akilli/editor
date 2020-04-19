import Command from '../base/Command.js';

/**
 * Iframe Command
 */
export default class IframeCommand extends Command {
    /**
     * Initializes a new iframe command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe', 'iframe');
    }

    /**
     * Inserts iframe element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     */
    insert({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'No media element';
        }

        attributes.allowfullscreen = 'allowfullscreen';

        const figure = this.editor.createElement('figure', {attributes: {class: 'iframe'}});
        const media = this.editor.createElement('iframe', {attributes: attributes});
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        figure.appendChild(media);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
