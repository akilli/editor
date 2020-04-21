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
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [controls = 'controls']
     */
    insert({src, width = '', height = '', controls = 'controls'} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'audio'}});
        figure.appendChild(this.editor.createElement('audio', {attributes: {src, width, height, controls}}));
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
