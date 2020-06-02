import Plugin from '../base/Plugin.js';

/**
 * Italic Plugin
 */
export default class Italic extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'italic';
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'i',
            group: 'format',
            children: ['text'],
        });
        this.registerCommand('italic', 'i')
    }
}
