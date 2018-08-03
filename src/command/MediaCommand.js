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

        if (!!this.editor.config.mediabrowser) {
            MediaBrowser.open(this.editor.window, this.editor.config.mediabrowser, (data) => this.insertElement(data));
        } else if (url = this.editor.window.prompt('URL')) {
            this.insertElement({src: url});
        }
    }

    /**
     * Insert media element
     *
     * @private
     *
     * @param {Object} data
     */
    insertElement(data) {
        if (!data.src) {
            return;
        }

        data.src = this.editor.url(data.src);
        MediaType.fromUrl(data.src)
            .then(type => {
                let tag;

                if (!type || !(tag = this.editor.getTag(type.element))) {
                    return;
                }

                const figure = this.editor.document.createElement('figure');
                const media = this.editor.document.createElement(type.element);

                figure.classList.add('media');
                figure.classList.add(type.id);
                figure.appendChild(media);

                tag.attributes.forEach(item => {
                    if (['allowfullscreen', 'alt', 'controls'].includes(item)) {
                        media.setAttribute(item, item);
                    } else if (data[item]) {
                        media.setAttribute(item, data[item]);
                    }
                });

                if (!!data.caption) {
                    const figcaption = this.editor.document.createElement('figcaption');
                    figcaption.innerHTML = data.caption;
                    figure.appendChild(figcaption);
                }

                this.editor.insert(figure);
            });
    }
}
