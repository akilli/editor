import Command from './Command.js';
import MediaBrowser from '../media/MediaBrowser.js';
import MediaType from '../media/MediaType.js';

/**
 * Media Command
 */
export default class MediaCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let url;

        if (this.editor.config.mediabrowser) {
            MediaBrowser.open(this.editor.window, this.editor.config.mediabrowser, (data) => this.prepare(data));
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
        if (!data.src) {
            return;
        }

        if (data.type) {
            this.insert(data);
        } else {
            MediaType.fromUrl(data.src)
                .then(type => {
                    data.type = type;
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
        let type;
        let tag;

        if (!data.src || !data.type || !(type = MediaType.get(data.type)) || !(tag = this.editor.getTag(type.element))) {
            return;
        }

        const figure = this.editor.document.createElement('figure');
        const media = this.editor.document.createElement(type.element);

        data.src = this.editor.url(data.src);

        figure.classList.add(type.id);
        figure.appendChild(media);

        tag.attributes.forEach(item => {
            if (['allowfullscreen', 'alt', 'controls'].includes(item)) {
                media.setAttribute(item, item);
            } else if (data[item]) {
                media.setAttribute(item, data[item]);
            }
        });

        if (data.caption) {
            const figcaption = this.editor.document.createElement('figcaption');
            figcaption.innerHTML = data.caption;
            figure.appendChild(figcaption);
        }

        this.editor.insert(figure);
    }
}
