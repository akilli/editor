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
        const browser = this.editor.config[`${this.type.id}browser`];
        let url;

        if (browser) {
            Browser.open(this.editor.window, browser, data => this.prepare(data));
        } else if (url = this.editor.window.prompt('URL')) {
            this.prepare({src: url});
        }
    }

    /**
     * Prepare media element
     *
     * @private
     *
     * @param {Object} data
     */
    prepare(data) {
        if (data.src && data.type) {
            this.insert(data);
        } else if (data.src) {
            Media.fromUrl(data.src)
                .then(type => {
                    data.type = type.id;
                    this.insert(data);
                });
        }
    }

    /**
     * Insert media element
     *
     * @private
     *
     * @param {Object} data
     */
    insert(data) {
        if (!data.src || !data.type || data.type !== this.type.id) {
            return;
        }

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
