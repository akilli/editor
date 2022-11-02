import AlignCommand from './AlignCommand.js';
import Alignment from '../base/Alignment.js';
import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';

export default class Align extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'align';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        const alignments = {
            [Alignment.NONE]: 'No alignment',
            [Alignment.LEFT]: 'Align left',
            [Alignment.CENTER]: 'Align center',
            [Alignment.RIGHT]: 'Align right',
        };
        Object.entries(alignments).forEach(([alignment, label]) => {
            const command = new AlignCommand(this.editor, alignment);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }
}
