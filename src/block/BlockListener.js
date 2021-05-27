import Listener from '../base/Listener.js';
import { TagName } from '../base/enum.js';

/**
 * Block listener to set API and CSS
 */
export default class BlockListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertappblock', this);
    }

    /**
     * Filters block elements without id when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName(TagName.BLOCK)).forEach(
            /** @param {HTMLElement} item */
            item => item.id || item.parentElement.removeChild(item),
        );
    }

    /**
     * Removes block element if no id is set or sets block content from API if configured
     *
     * @param {CustomEvent} event
     * @param {BlockElement} event.detail.element
     * @return {Promise<void>}
     */
    async insertappblock(event) {
        if (!event.detail.element.id) {
            event.detail.element.parentElement.removeChild(event.detail.element);
            return;
        }

        if (!this.editor.config.block.api) {
            return;
        }

        const url = this.editor.config.block.api.replace('{id}', event.detail.element.id);
        const response = await fetch(url, { mode: 'no-cors' });

        if (!response.ok) {
            return;
        }

        let css = '';

        if (this.editor.config.block.css) {
            css = this.editor.config.block.css
                .split(',')
                .map(item => `<link rel="stylesheet" href="${item}">`)
                .join('');
        }

        const content = await response.text();
        event.detail.element.content = css + content;
    }
}
