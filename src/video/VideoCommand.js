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
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [controls = 'controls']
     */
    insert({src, width = '', height = '', controls = 'controls'} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'video'}});
        figure.appendChild(this.editor.createElement('video', {attributes: {src, width, height, controls}}));
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
