import Command from '../base/Command.js';

/**
 * Audio Command
 */
export default class AudioCommand extends Command {
    /**
     * Initializes a new audio command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'audio', 'audio');
    }

    /**
     * Inserts audio element
     *
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     */
    insert({caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            throw 'Invalid argument';
        }

        attributes.controls = 'controls';

        const figure = this.editor.createElement('figure', {attributes: {class: 'audio'}});
        const media = this.editor.createElement('audio', {attributes: attributes});
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        figure.appendChild(media);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
