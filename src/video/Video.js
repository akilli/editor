import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import VideoDialog from './VideoDialog.js';
import VideoListener from './VideoListener.js';

export default class Video extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'video';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Figure];
    }

    /**
     * @type {Object.<string, any>}
     */
    static get config() {
        return { browser: undefined };
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.VIDEO,
            group: TagGroup.VIDEO,
            attributes: ['controls', 'height', 'id', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new VideoListener(this.editor);
        this.editor.dialogs.set(new VideoDialog(this.editor, this.constructor.name, this.editor.config.video.browser));
        this._command(TagName.VIDEO);
        this._toolbar('Video');
    }
}
