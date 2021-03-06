import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import VideoDialog from './VideoDialog.js';
import VideoListener from './VideoListener.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

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
        this._i18n(i18n);
        this._tag({
            name: TagName.VIDEO,
            group: TagGroup.VIDEO,
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new VideoListener(this.editor);
        this.editor.dialogs.set(new VideoDialog(this.editor, this.editor.config.video.browser));
        this._command(TagName.VIDEO);
        this._toolbar(this._('Video'));
    }
}
