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
        super(editor, 'audio');
    }

    /**
     * Inserts audio element
     *
     * @protected
     * @param {String} src
     * @param {String} [caption = '']
     * @param {String} [width = '']
     * @param {String} [height = '']
     */
    _insert({src, caption = '', width = '', height = ''} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'audio'}});
        figure.appendChild(this.editor.createElement('audio', {attributes: {src: this.editor.url(src), width, height}}));
        figure.appendChild(this.editor.createElement('figcaption', {html: caption}));
        this.editor.insert(figure);
    }
}
