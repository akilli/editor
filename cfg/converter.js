import ElementConverter from '../src/converter/ElementConverter.js';
import TextConverter from '../src/converter/TextConverter.js';

/**
 * Tag converter configuration
 *
 * @type {Object.<String, Converter>}
 */
export default {
    abbr: new TextConverter(),
    b: new ElementConverter('strong'),
    code: new TextConverter(),
    data: new TextConverter(),
    div: new ElementConverter('p'),
    em: new ElementConverter('i'),
    ins: new TextConverter(),
    samp: new TextConverter(),
    small: new TextConverter(),
    span: new TextConverter(),
    time: new TextConverter(),
    u: new TextConverter(),
    var: new ElementConverter('i'),
}
