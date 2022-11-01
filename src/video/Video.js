import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import VideoDialog from './VideoDialog.js';
import VideoListener from './VideoListener.js';

/**
 * Video Plugin
 */
export default class Video extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'video';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Figure];
    }

    /**
     * @inheritDoc
     */
    static get config() {
        return { browser: undefined };
    }

    /**
     * @inheritDoc
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
        this.editor.dialogs.set(new VideoDialog(this.editor, this.editor.config.video.browser));
        this._command(TagName.VIDEO);
        this._toolbar('Video');
    }
}
