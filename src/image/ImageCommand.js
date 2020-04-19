import Command from '../base/Command.js';

/**
 * Image Command
 */
export default class ImageCommand extends Command {
    /**
     * Initializes a new image command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image', 'img');
    }

    /**
     * Inserts image element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     */
    insert({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'No media element';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'image'}});
        const media = this.editor.createElement('img', {attributes: attributes});
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        figure.appendChild(media);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
