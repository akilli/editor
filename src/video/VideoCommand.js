import Command from '../base/Command.js';

/**
 * Video Command
 */
export default class VideoCommand extends Command {
    /**
     * Initializes a new video command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'video', 'video');
    }

    /**
     * Inserts video element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     */
    insert({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'No media element';
        }

        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {attributes: {class: 'video'}});
        const media = this.editor.createElement('video', {attributes: attributes});
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        figure.appendChild(media);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
