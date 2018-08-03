import Editor from '../Editor.js';

/**
 * Toolbar
 */
export default class Toolbar {
    /**
     * Initializes toolbar with a reference to the editor
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Corresponding DOM element
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.element = this.editor.document.createElement('div');

        this.element.classList.add('editor-toolbar');
        this.editor.element.parentNode.insertBefore(this.element, this.editor.element);
    }

    /**
     * Init toolbar
     */
    init() {
        for (let item of this.editor.commands.entries()) {
            const img = this.editor.document.createElement('img');

            img.setAttribute('src', this.icon(item[0]));
            img.setAttribute('alt', item[0]);
            img.setAttribute('title', item[0]);
            img.addEventListener('click', () => {
                if (!this.editor.window.getSelection().containsNode(this.editor.element, true)) {
                    this.editor.element.focus();
                }

                item[1].execute();
            });
            this.element.appendChild(img);
        }
    }

    /**
     * Returns command icon URL
     *
     * @param {String} name
     *
     * @return {String}
     */
    icon(name) {
        return this.editor.gui('command/' + name + '.svg');
    }
}