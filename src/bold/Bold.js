import Plugin from '../base/Plugin.js';

/**
 * Bold Plugin
 */
export default class Bold extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'bold';
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'b',
            group: 'format',
            children: ['text'],
        });
        this.registerCommand('bold', 'b')
    }
}
