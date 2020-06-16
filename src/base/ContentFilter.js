import Filter from './Filter.js';

/**
 * Content filter
 */
export default class ContentFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        const tag = this.editor.tags.get(element);
        const allowedParagraph = this.editor.tags.allowed(element, 'p');
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
                child = this.__convert(child);
                const childTag = this.editor.tags.get(child);

                if (childTag && this.editor.tags.allowed(element, child)) {
                    wrap(child);
                    this.__element(child, childTag);
                } else if (childTag && childTag.group === 'format' && allowedParagraph) {
                    if ((child = this.__element(child, childTag))) {
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
            } else if (child instanceof Node) {
                element.removeChild(child);
            }
        });

        wrap();
    }

    /**
     * Converts element
     *
     * @private
     * @param {HTMLElement} element
     * @return {HTMLElement}
     */
    __convert(element) {
        const name = this.editor.config.base.filter[element.localName];

        if (!name) {
            return element;
        }

        const convert = this.editor.createElement(name, {html: element.innerHTML});
        element.parentElement.replaceChild(convert, element);

        return convert;
    }

    /**
     * Filters element
     *
     * @private
     * @param {HTMLElement} element
     * @param {Tag} tag
     * @return {?HTMLElement}
     */
    __element(element, tag) {
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
}
