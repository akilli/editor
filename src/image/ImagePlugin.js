import BrowserDialog from '../base/BrowserDialog.js';
import ImageCommand from './ImageCommand.js';
import ImageDialog from './ImageDialog.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';
import i18n from './i18n.js';

/**
 * Image Plugin
 */
export default class ImagePlugin extends Plugin {
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
        const tagName = 'img';
        this.editor.tags.set(new Tag({name: tagName, group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true}));
        this.registerTranslator(i18n);

        if (this.editor.config[this.name].browser) {
            this.editor.dialogs.set(new BrowserDialog(this.editor, this.name, this.editor.config[this.name].browser));
        } else {
            this.editor.dialogs.set(new ImageDialog(this.editor, this.name));
        }

        this.editor.commands.set(new ImageCommand(this.editor, this.name, tagName));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {browser: null};
    }
}
