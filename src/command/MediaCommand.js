import Command from './Command.js';
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
            const feat = 'alwaysRaised=yes,dependent=yes,height=' + this.editor.window.screen.height +
                ',location=no,menubar=no,minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' +
                this.editor.window.screen.width;
            const win = this.editor.window.open(this.editor.config.mediabrowser, 'mediabrowser', feat);
            let origin;

            try {
                origin = win.origin;
            } catch (e) {
                this.editor.window.console.log(e);
                const a = this.editor.document.createElement('a');
                a.href = this.editor.config.mediabrowser;
                origin = a.origin;
            }

            this.editor.window.addEventListener('message', (ev) => {
                if (ev.origin === origin && ev.source === win && !!ev.data.src) {
                    this.insertElement(ev.data);
                    win.close();
                }
            }, false);
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

                this.editor.document.execCommand('inserthtml', false, figure.outerHTML);
            });
    }
}
