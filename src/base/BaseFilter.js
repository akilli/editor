import Filter from './Filter.js';

/**
 * Base filter
 */
export default class BaseFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        const tag = this.editor.tags.get(element);
        const allowedParagraph = this.editor.tags.isAllowed('p', element);
        const allowedText = tag.editable || tag.group === 'format';
        let p = [];
        const wrap = (ref = null) => {
            if (allowedParagraph && p.length > 0) {
                element.insertBefore(this.editor.createElement('p', {html: p.join(' ')}), ref);
                p = [];
            }
        };

        Array.from(element.childNodes).forEach(child => {
            const text = child.textContent.trim();

            if (child instanceof HTMLElement) {
                child = this.convert(child);
                const childTag = this.editor.tags.get(child);

                if (childTag && this.editor.tags.isAllowed(child, element)) {
                    wrap(child);
                    this.filterElement(child, childTag);
                } else if (childTag && childTag.group === 'format' && allowedParagraph) {
                    if ((child = this.filterElement(child, childTag))) {
                        p.push(child.outerHTML);
                        element.removeChild(child);
                    }
                } else if (!allowedText && text && allowedParagraph) {
                    p.push(text);
                    element.removeChild(child);
                } else if (allowedText && text) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                if (!allowedText && text && allowedParagraph) {
                    p.push(text);
                }

                if (!allowedText || !text) {
                    element.removeChild(child);
                }
            } else {
                element.removeChild(child);
            }
        });

        wrap();
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
