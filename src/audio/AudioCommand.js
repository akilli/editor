import Command from '../base/Command.js';

/**
 * Audio Command
 */
export default class AudioCommand extends Command {
    /**
     * Inserts audio element
     *
     * @param {String} src
     * @param {String} [caption = '']
     * @param {String} [width = '']
     * @param {String} [height = '']
     * @param {String} [controls = 'controls']
     */
    insert({src, caption = '', width = '', height = '', controls = 'controls'} = {}) {
        if (!src) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {attributes: {class: this.name}});
        figure.appendChild(this.editor.createElement(this.tagName, {attributes: {src: this.editor.url(src), width, height, controls}}));
        figure.appendChild(this.editor.createElement('figcaption', {content: caption, html: true}));

        this.editor.insert(figure);
    }
}
