import ElementConverter from '../src/converter/ElementConverter.js';
import TextConverter from '../src/converter/TextConverter.js';

/**
 * Tag converter configuration
 */
const data = [
    ['abbr', editor => new TextConverter(editor)],
    ['b', editor => new ElementConverter(editor, 'strong')],
    ['code', editor => new TextConverter(editor)],
    ['data', editor => new TextConverter(editor)],
    ['div', editor => new ElementConverter(editor, 'p')],
    ['em', editor => new ElementConverter(editor, 'i')],
    ['ins', editor => new TextConverter(editor)],
    ['small', editor => new TextConverter(editor)],
    ['span', editor => new TextConverter(editor)],
    ['sub', editor => new TextConverter(editor)],
    ['sup', editor => new TextConverter(editor)],
    ['time', editor => new TextConverter(editor)],
    ['u', editor => new TextConverter(editor)],
    ['var', editor => new ElementConverter(editor, 'i')],
];

export default data;
