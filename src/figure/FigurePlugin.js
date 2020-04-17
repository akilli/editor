import FigureFilter from './FigureFilter.js';
import FigureObserver from './FigureObserver.js';
import Plugin from '../base/Plugin.js';

/**
 * Figure Plugin
 */
export default class FigurePlugin extends Plugin {
    /**
     * Initializes a new figure plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'figure');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new FigureObserver(this.editor));
        this.editor.filters.set(this.name, new FigureFilter(this.editor, this.name));
    }
}
