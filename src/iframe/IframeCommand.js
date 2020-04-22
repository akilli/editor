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
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [allowfullscreen = 'allowfullscreen']
     */
    insert({src, width = '', height = '', allowfullscreen = 'allowfullscreen'} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'iframe'}});
        figure.appendChild(this.editor.createElement('iframe', {attributes: {src, width, height, allowfullscreen}}));
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}