import BrowserDialog from '../editor/BrowserDialog.js';
import Command from '../editor/Command.js';
import MediaDialog from './MediaDialog.js';
import MediaType from './MediaType.js';

/**
 * Media Command
 */
export default class MediaCommand extends Command {
    /**
     * Initializes a new editor media command with given tag name
     *
     * @param {Editor} editor
     * @param {String} tagName
     */
    constructor(editor, tagName) {
        super(editor, tagName, MediaDialog);

        let type;

        if (!this.tag || !(type = MediaType.fromElement(this.tag.name))) {
            throw 'No media element';
        }

        if (this.editor.config.media[type.id]) {
            this.dialog = new BrowserDialog(this.editor, data => this.insert(data), this.editor.config.media[type.id]);
        }

        /**
         * Type
         *
         * @type {MediaTypeElement}
         * @readonly
         */
        this.type = type;
    }

    /**
     * Insert media
     *
     * @param {?String} [type = null]
     * @param {String} [caption = '']
     * @param {Object.<String, String>} atttibutes
     */
    async insert({type = null, caption = '', ...attributes} = {}) {
        if (!attributes.src) {
            return;
        }

        const a = this.editor.createElement('a', {href: attributes.src});
        const origin = this.editor.window.origin || this.editor.window.location.origin;
        let mediaType;

        attributes.src = a.origin === origin ? a.pathname : a.href;

        if (type && type === this.type.id
            || (mediaType = await MediaType.fromUrl(attributes.src)) && mediaType.id === this.type.id
            || !mediaType && a.origin !== origin
        ) {
            const figure = this.editor.createElement('figure', {class: this.type.id});
            const media = this.editor.createElement(this.type.element);
            const figcaption = this.editor.createElement('figcaption');

            figure.appendChild(media);
            this.tag.attributes.forEach(item => {
                if (['allowfullscreen', 'controls'].includes(item)) {
                    media.setAttribute(item, item);
                } else if (attributes[item]) {
                    media.setAttribute(item, attributes[item]);
                }
            });
            figcaption.innerHTML = caption;
            figure.appendChild(figcaption);

            this.editor.insert(figure);
        }
    }
}
