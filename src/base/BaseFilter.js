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
        const allowedText = this.editor.tags.isAllowed('text', element);
        const allowedParagraph = this.editor.tags.isAllowed('p', element);

        Array.from(element.childNodes).forEach(child => {
            if (child instanceof HTMLElement) {
                child = this.convert(child);
                const tag = this.editor.tags.get(child);
                const text = child.textContent.trim();

                if (tag && this.editor.tags.isAllowed(child, element)) {
                    this.filterElement(child, tag);
                } else if (tag && tag.group === 'format' && allowedParagraph) {
                    if ((child = this.filterElement(child, tag))) {
                        element.replaceChild(this.editor.createElement('p', {html: child.outerHTML}), child);
                    }
                } else if (!allowedText && text && allowedParagraph) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (allowedText && text) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                const text = child.textContent.trim();

                if (!allowedText && text && allowedParagraph) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (!allowedText || !text) {
                    element.removeChild(child);
                }
            } else {
                element.removeChild(child);
            }
        });

        this.filterLinebreaks(element);
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
     * Filters element
     *
     * @private
     * @param {HTMLElement} element
     * @param {Tag} tag
     * @return {?HTMLElement}
     */
    filterElement(element, tag) {
        Array.from(element.attributes).forEach(item => !tag.attributes.includes(item.name) && element.removeAttribute(item.name));

        if (element.hasChildNodes()) {
            this.editor.filters.filter(element);
        }

        if (element.hasChildNodes() || tag.empty) {
            return element;
        }

        element.parentElement.removeChild(element);

        return null;
    }

    /**
     * Filters linebreaks
     *
     * @private
     * @param {HTMLElement} element
     */
    filterLinebreaks(element) {
        element.innerHTML = element.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (element instanceof HTMLParagraphElement) {
            element.outerHTML = element.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else{
            element.innerHTML = element.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }
}
