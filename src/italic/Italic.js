import Base from '../base/Base.js';
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
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'i',
            group: 'format',
        });
        this._command('italic', 'i')
    }
}
