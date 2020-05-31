import Filter from './Filter.js';

/**
 * Base filter
 */
export default class BaseFilter extends Filter {
    /**
     * Initializes a new base filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'base');
    }

    /**
     * @inheritDoc
     */
    filter(element) {
        const isRoot = this.editor.isContent(element);

        Array.from(element.childNodes).forEach(child => {
            if (child instanceof HTMLElement) {
                child = this.convert(child);
                const tag = this.editor.tags.get(child);
                const text = child.textContent.trim();

                if (tag && (this.editor.tags.isAllowed(child, element) || isRoot && tag.group === 'format' && this.editor.tags.isAllowed('p', element))) {
                    Array.from(child.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            child.removeAttribute(item.name);
                        }
                    });

                    if (child.hasChildNodes()) {
                        this.editor.filters.filter(child);
                    }

                    if (!child.hasChildNodes() && !tag.empty) {
                        element.removeChild(child);
                    } else if (!this.editor.tags.isAllowed(child, element)) {
                        element.replaceChild(this.editor.createElement('p', {html: child.outerHTML}), child);
                    }
                } else if (isRoot && text && this.editor.tags.isAllowed('p', element)) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (text && this.editor.tags.isAllowed('text', element)) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                const text = child.textContent.trim();

                if (isRoot && text && this.editor.tags.isAllowed('p', element)) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (!text || !this.editor.tags.isAllowed('text', element)) {
                    element.removeChild(child);
                }
            } else {
                element.removeChild(child);
            }
        });

        this.linebreaks(element);
    }

    /**
     * Converts element
     *
     * @private
     * @param {HTMLElement} element
     * @return {HTMLElement}
     */
    convert(element) {
        const target = this.editor.config.base.filter[element.localName];

        if (!target) {
            return element;
        }

        const newNode = this.editor.createElement(target, {html: element.innerHTML})
        element.parentElement.replaceChild(newNode, element);

        return newNode;
    }

    /**
     * Filters linebreaks
     *
     * @private
     * @param {HTMLElement} element
     */
    linebreaks(element) {
        element.innerHTML = element.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (element instanceof HTMLParagraphElement) {
            element.outerHTML = element.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else{
            element.innerHTML = element.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }
}
