import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SlotListener from './SlotListener.js';

/**
 * Slot Plugin
 */
export default class Slot extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'slot';
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
        this.editor.tags.create({name: 'slot', group: 'slot', editable: true, focusable: true, navigable: true});
        new SlotListener(this.editor);
    }
}
