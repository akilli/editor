import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SlotObserver from './SlotObserver.js';

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
        this.editor.tags.create({
            name: 'slot',
            group: 'slot',
            editable: true,
            focusable: true,
            navigable: true,
        });
        this.editor.observe(new SlotObserver(this.editor));
    }
}
