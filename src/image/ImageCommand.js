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
        super(editor, 'image');
    }

    /**
     * Inserts image element
     *
     * @protected
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [alt = '']
     */
    _insert({src, width = '', height = '', alt = ''} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'image'}});
        figure.appendChild(this.editor.createElement('img', {attributes: {src: this.editor.url(src), width, height, alt}}));
        this.editor.insert(figure);
    }
}
