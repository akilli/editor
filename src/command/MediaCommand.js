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
    execute() {
        let url;

        if (this.editor.config.mediabrowser) {
            Browser.open(this.editor.window, this.editor.config.mediabrowser, data => this.prepare(data));
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
        let type;
        let tag;

        if (!data.src || !data.type || !(type = Media.get(data.type)) || !(tag = this.editor.getTag(type.element))) {
            return;
        }

        const figure = this.editor.document.createElement('figure');
        const media = this.editor.document.createElement(type.element);
        const figcaption = this.editor.document.createElement('figcaption');

        data.src = this.editor.url(data.src);

        figure.classList.add(type.id);
        figure.appendChild(media);
        tag.attributes.forEach(item => {
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
