import Command from '../editor/Command.js';
import DetailsElement from './DetailsElement.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../editor/Plugin.js';

/**
 * Details Plugin
 */
export default class DetailsPlugin extends Plugin {
    /**
     * Initializes a new details plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new DetailsObserver(this.editor, 'details'));
        this.editor.elements.set(this.name, new DetailsElement(this.editor));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
