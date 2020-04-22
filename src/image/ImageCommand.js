import Command from '../base/Command.js';

/**
 * Image Command
 */
export default class ImageCommand extends Command {
    /**
     * Inserts image element
     *
     * @param {String} src
     * @param {String} [caption = '']
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [alt = '']
     */
    insert({src, caption = '', width = '', height = '', alt = ''} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: this.name}});
        figure.appendChild(this.editor.createElement(this.tagName, {attributes: {src: this.editor.url(src), width, height, alt}}));
        figure.appendChild(this.editor.createElement('figcaption', {content: caption, html: true}));

        this.editor.insert(figure);
    }
}
