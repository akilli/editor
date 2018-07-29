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

        data.src = this.editor.url(data.src);
        MediaUtils.getTypeFromUrl(data.src)
            .then(type => {
                let cfg;

                if (!type || !(cfg = this.editor.tags[type.element])) {
                    return;
                }

                let html = '<' + type.element;

                cfg.attributes.forEach(item => {
                    if (['allowfullscreen', 'alt', 'controls'].includes(item)) {
                        html += ' ' + item + '="' + item + '"';
                    } else if (data[item]) {
                        html += ' ' + item + '="' + data[item] + '"';
                    }
                });
                html += cfg.empty ? ' />' : '></' + type.element + '>';

                if (!!data.caption) {
                    html += '<figcaption>' + data.caption + '</figcaption>';
                }

                this.editor.execute('inserthtml', '<figure class="media ' + type.id + '">' + html + '</figure>');
            });
    }
}
