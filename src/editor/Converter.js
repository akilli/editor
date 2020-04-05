import EditorObject from './EditorObject.js';

/**
 * HTML Element Converter
 */
export default class Converter extends EditorObject {
    /**
     * Converts an HTML element to another or to a text node
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement|Text}
     */
    convert(element) {
        throw 'Not implemented';
    }
}
