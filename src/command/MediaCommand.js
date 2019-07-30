import Browser from '../util/Browser.js';
import Command from './Command.js';
import Media from '../util/Media.js';

/**
 * Media Command
 */
export default class MediaCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName) {
        super(editor, tagName);

        let type;

        if (!this.tag || this.tag.group !== 'media' || !(type = Media.fromElement(this.tag.name))) {
            throw 'Invalid media element';
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
    execute() {
        const browser = this.editor.config.media[this.type.id];
        let url;

        if (browser) {
            Browser.open(this.editor.window, browser, data => this.insert(data));
        } else if (url = this.editor.window.prompt('URL')) {
            this.insert({src: url});
        }
    }

    /**
     * Insert media element
     *
     * @private
     *
     * @param {Object} data
     */
    async insert(data) {
        let type;

        if (data.src && (data.type || (type = await Media.fromUrl(data.src)) && (data.type = type.id))) {
            const figure = this.editor.document.createElement('figure');
            const media = this.editor.document.createElement(this.type.element);
            const figcaption = this.editor.document.createElement('figcaption');

            data.src = this.editor.url(data.src);

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
