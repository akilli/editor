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
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [alt = '']
     */
    insert({src, width = '', height = '', alt = ''} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'image'}});
        figure.appendChild(this.editor.createElement('img', {attributes: {src, width, height, alt}}));
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
