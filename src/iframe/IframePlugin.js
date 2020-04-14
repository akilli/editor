import BrowserDialog from '../editor/BrowserDialog.js';
import Command from '../editor/Command.js';
import IframeDialog from './IframeDialog.js';
import MediaElement from '../media/MediaElement.js';
import Plugin from '../editor/Plugin.js';

/**
 * Iframe Plugin
 */
export default class IframePlugin extends Plugin {
    /**
     * Initializes a new iframe plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'iframe');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new MediaElement(this.editor, this.name, 'iframe'));
        const dialog = this.editor.config[this.name].browser ? BrowserDialog : IframeDialog;
        this.editor.dialogs.set(this.name, new dialog(this.editor, this.name));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
