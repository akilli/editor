import BrowserDialog from '../editor/BrowserDialog.js';
import Command from '../editor/Command.js';
import MediaElement from '../media/MediaElement.js';
import Plugin from '../editor/Plugin.js';
import VideoDialog from './VideoDialog.js';

/**
 * Video Plugin
 */
export default class VideoPlugin extends Plugin {
    /**
     * Initializes a new video plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'video');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new MediaElement(this.editor, this.name, 'video'));
        const dialog = this.editor.config[this.name].browser ? BrowserDialog : VideoDialog;
        this.editor.dialogs.set(this.name, new dialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
