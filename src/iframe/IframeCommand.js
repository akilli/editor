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
        super(editor, 'iframe');
    }

    /**
     * Inserts iframe element
     *
     * @protected
     * @param {String} src
     * @param {String} [width = '']
     * @param {String} [height = '']
     */
    _insert({src, width = '', height = ''} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: 'iframe'}});
        figure.appendChild(this.editor.createElement('iframe', {attributes: {src: this.editor.url(src), width, height}}));
        this.editor.insert(figure);
    }
}
