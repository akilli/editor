import Base from '../base/Base.js';
import BrowserDialog from '../base/BrowserDialog.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import VideoCommand from './VideoCommand.js';
import VideoDialog from './VideoDialog.js';
import VideoObserver from './VideoObserver.js';
import i18n from './i18n.js';

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
        return {browser: null};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'video',
            group: 'video',
            attributes: ['controls', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.editor.observe(new VideoObserver(this.editor));
        this.registerTranslator(i18n);

        if (this.editor.config.video.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'video', this.editor.config.video.browser));
        } else {
            this.editor.dialogs.set(new VideoDialog(this.editor));
        }

        this.editor.commands.set(new VideoCommand(this.editor));
    }
}
