import Dialog from '../base/Dialog.js';
import Section from './Section.js';

/**
 * Section Dialog
 */
export default class SectionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Section.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this._createLegend(this._('Section')));
        fieldset.appendChild(
            this._createInput('class', 'text', this._('CSS class'), { placeholder: this._('Insert CSS class') }),
        );
    }
}
