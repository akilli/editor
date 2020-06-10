import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

/**
 * Subheading Plugin
 */
export default class Subheading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subheading';
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
            name: 'h3',
            group: 'heading',
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command('subheading', 'h3');
    }
}
