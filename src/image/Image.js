import BrowserDialog from '../base/BrowserDialog.js';
import ImageCommand from './ImageCommand.js';
import ImageDialog from './ImageDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Image Plugin
 */
export default class Image extends Plugin {
    /**
     * @inheritDoc
     */
    static get defaultConfig() {
        return {browser: null};
    }

    /**
     * Initializes a new image plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'image');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'img',
            group: 'media',
            attributes: ['alt', 'height', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        this.registerTranslator(i18n);

        if (this.editor.config.image.browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, 'image', this.editor.config.image.browser));
        } else {
            this.editor.dialogs.set(new ImageDialog(this.editor));
        }

        this.editor.commands.set(new ImageCommand(this.editor));
    }
}
