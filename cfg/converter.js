import ElementConverter from '../src/converter/ElementConverter.js';
import NumberConverter from '../src/converter/NumberConverter.js';
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
    ['samp', () => new TextConverter()],
    ['small', () => new TextConverter()],
    ['span', () => new TextConverter()],
    ['sub', () => new NumberConverter()],
    ['sup', () => new NumberConverter()],
    ['time', () => new TextConverter()],
    ['u', () => new TextConverter()],
    ['var', () => new ElementConverter('i')],
];

export default data;
