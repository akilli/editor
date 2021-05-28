import Filter from './Filter.js';
import { TagGroup, TagName } from './enum.js';

/**
 * Content filter
 */
export default class ContentFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        const tag = this.editor.tags.get(element);
        const allowedParagraph = this.editor.tags.allowed(element, TagName.P);
        const allowedText = tag.editable || tag.group === TagGroup.FORMAT;
        let p = [];
        const wrap = (ref = null) => {
            if (allowedParagraph && p.length > 0) {
                element.insertBefore(this.editor.dom.createElement(TagName.P, { html: p.join(' ') }), ref);
                p = [];
            }
        };

        Array.from(element.childNodes).forEach(child => {
            const text = child.textContent.trim();

            if (child instanceof HTMLElement) {
                const realChild = this.#convert(child);
                const childTag = this.editor.tags.get(realChild);

                if (childTag && this.editor.tags.allowed(element, realChild)) {
                    wrap(realChild);
                    this.#element(realChild, childTag);
                } else if (childTag && childTag.group === TagGroup.FORMAT && allowedParagraph) {
                    const filteredChild = this.#element(realChild, childTag);

                    if (filteredChild) {
                        p.push(filteredChild.outerHTML);
                        element.removeChild(filteredChild);
                    }
                } else if (!allowedText && text && allowedParagraph) {
                    p.push(text);
                    element.removeChild(realChild);
                } else if (allowedText && text) {
                    element.replaceChild(this.editor.dom.createText(text), realChild);
                } else {
                    element.removeChild(realChild);
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
     * @param {HTMLElement} element
     * @return {HTMLElement}
     */
    #convert(element) {
        const name = this.editor.config.base.filter[element.localName];

        if (!name) {
            return element;
        }

        const convert = this.editor.dom.createElement(name, { html: element.innerHTML });
        element.parentElement.replaceChild(convert, element);

        return convert;
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} element
     * @param {Tag} tag
     * @return {HTMLElement|undefined}
     */
    #element(element, tag) {
        Array.from(element.attributes).forEach(
            item => !tag.attributes.includes(item.name) && element.removeAttribute(item.name),
        );

        if (element.hasChildNodes()) {
            this.editor.filters.filter(element);
        }

        if (element.hasChildNodes() || tag.empty) {
            return element;
        }

        element.parentElement.removeChild(element);

        return undefined;
    }
}
