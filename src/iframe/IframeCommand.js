import Command from '../base/Command.js';

/**
 * Iframe Command
 */
export default class IframeCommand extends Command {
    /**
     * Inserts iframe element
     *
     * @param {String} src
     * @param {String} [caption = '']
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [allowfullscreen = 'allowfullscreen']
     */
    insert({src, caption = '', width = '', height = '', allowfullscreen = 'allowfullscreen'} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: this.name}});
        figure.appendChild(this.editor.createElement(this.tagName, {attributes: {src: this.editor.url(src), width, height, allowfullscreen}}));
        figure.appendChild(this.editor.createElement('figcaption', {content: caption, html: true}));

        this.editor.insert(figure);
    }
}
