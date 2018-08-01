import ElementConverter from '../src/converter/ElementConverter.js';
import TextConverter from '../src/converter/TextConverter.js';

/**
 * Tag converter configuration
 */
const data = [
    ['abbr', () => new TextConverter()],
    ['b', () => new ElementConverter('strong')],
    ['code', () => new TextConverter()],
    ['data', () => new TextConverter()],
    ['div', () => new ElementConverter('p')],
    ['em', () => new ElementConverter('i')],
    ['ins', () => new TextConverter()],
    ['small', () => new TextConverter()],
    ['span', () => new TextConverter()],
    ['sub', () => new TextConverter()],
    ['sup', () => new TextConverter()],
    ['time', () => new TextConverter()],
    ['u', () => new TextConverter()],
    ['var', () => new ElementConverter('i')],
];

export default data;
