import BrowserDialog from '../dialog/BrowserDialog.js';
import Command from '../editor/Command.js';
import Media from '../media/Media.js';
import MediaDialog from '../dialog/MediaDialog.js';

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

        if (!this.tag || this.tag.group !== 'media' || !(type = Media.fromElement(this.tag.name))) {
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
     * @inheritDoc
     */
    async insert(data = {}) {
        if (!data.src) {
            return;
        }

        const a = this.editor.createElement('a', {href: data.src});
        const origin = this.editor.window.origin || this.editor.window.location.origin;
        let type;

        data.src = a.origin === origin ? a.pathname : a.href;

        if (data.type && data.type === this.type.id
            || (type = await Media.fromUrl(data.src)) && type.id === this.type.id
            || !type && a.origin !== origin
        ) {
            const figure = this.editor.createElement('figure');
            const media = this.editor.createElement(this.type.element);
            const figcaption = this.editor.createElement('figcaption');

            figure.classList.add(this.type.id);
            figure.appendChild(media);
            this.tag.attributes.forEach(item => {
                if (['allowfullscreen', 'controls'].includes(item)) {
                    media.setAttribute(item, item);
                } else if (data[item]) {
                    media.setAttribute(item, data[item]);
                }
            });
            figcaption.innerHTML = data.caption || '';
            figure.appendChild(figcaption);

            this.editor.insert(figure);
        }
    }
}
