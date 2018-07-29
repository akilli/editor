import Command from './Command.js';
import MediaBrowser from '../utils/MediaBrowser.js';
import MediaUtils from '../utils/MediaUtils.js';

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

        MediaUtils.getTypeFromUrl(data.src)
            .then(type => {
                if (!type) {
                    return;
                }

                const figure = this.editor.document.createElement('figure');
                const media = this.editor.document.createElement(type.element);

                figure.classList.add('media');
                figure.classList.add(type.id);
                figure.appendChild(media);
                media.setAttribute('src', this.editor.url(data.src));

                ['height', 'width'].forEach(item => {
                    if (data[item]) {
                        media.setAttribute(item, data[item]);
                    }
                });

                if (type.id === 'image') {
                    media.setAttribute('alt', data.alt || '');
                } else if (['audio', 'video'].includes(type.id)) {
                    media.setAttribute('controls', 'controls');
                } else if (type.id === 'iframe') {
                    media.setAttribute('allowfullscreen', 'allowfullscreen');
                }

                if (!!data.caption) {
                    const caption = this.editor.document.createElement('figcaption');
                    caption.innerHTML = data.caption;
                    figure.appendChild(caption);
                }

                this.editor.execute('inserthtml', figure.outerHTML);
            });
    }
}
