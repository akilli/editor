import AlignCommand from './AlignCommand.js';
import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Alignment } from '../base/enum.js';

/**
 * Align Plugin
 */
export default class Align extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'align';
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
        this._i18n(i18n);
        const alignments = {
            [Alignment.NONE]: this._('No alignment'),
            [Alignment.LEFT]: this._('Align left'),
            [Alignment.CENTER]: this._('Align center'),
            [Alignment.RIGHT]: this._('Align right'),
        };
        Object.entries(alignments).forEach(([alignment, label]) => {
            const command = new AlignCommand(this.editor, alignment);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }
}
