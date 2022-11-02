import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class BlockListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertappblock', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.BLOCK)).forEach(
            /** @param {HTMLElement} item */
            (item) => item.id || item.parentElement.removeChild(item)
        );
    }

    /**
     * @param {CustomEvent} event
     * @param {BlockElement} event.detail.element
     * @return {Promise<void>}
     */
    async insertappblock({ detail: { element } }) {
        if (!element.id) {
            element.parentElement.removeChild(element);
            return;
        }

        if (!this.editor.config.block.api) {
            return;
        }

        const url = this.editor.config.block.api.replace('{id}', element.id);
        const response = await fetch(url, { mode: 'no-cors' });

        if (!response.ok) {
            return;
        }

        let css = '';

        if (this.editor.config.block.css) {
            css = this.editor.config.block.css
                .split(',')
                .map((item) => `<link rel="stylesheet" href="${item}">`)
                .join('');
        }

        const content = await response.text();
        element.content = css + content;
    }
}
