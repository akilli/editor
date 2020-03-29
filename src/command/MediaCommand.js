import Command from '../editor/Command.js';
import MediaDialog from '../dialog/MediaDialog.js';

/**
 * Media Command
 */
export default class MediaCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName) {
        super(editor, tagName, MediaDialog);

        let type;

        if (!this.tag || this.tag.group !== 'media' || !(type = this.editor.media.fromElement(this.tag.name))) {
            throw 'No media element';
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

        if (browser) {
            this.editor.browser(browser, data => this.insert(data));
        } else {
            super.execute();
        }
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
            || (type = await this.editor.media.fromUrl(data.src)) && type.id === this.type.id
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
