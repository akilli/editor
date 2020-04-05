import ElementConverter from '../src/editor/ElementConverter.js';
import TextConverter from '../src/editor/TextConverter.js';

/**
 * Tag converter configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new TextConverter(editor, 'abbr'),
    editor => new ElementConverter(editor, 'b', 'strong'),
    editor => new TextConverter(editor, 'code'),
    editor => new TextConverter(editor, 'data'),
    editor => new ElementConverter(editor, 'div', 'p'),
    editor => new ElementConverter(editor, 'em', 'i'),
    editor => new TextConverter(editor, 'ins'),
    editor => new TextConverter(editor, 'samp'),
    editor => new TextConverter(editor, 'small'),
    editor => new TextConverter(editor, 'span'),
    editor => new TextConverter(editor, 'time'),
    editor => new TextConverter(editor, 'u'),
    editor => new ElementConverter(editor, 'var', 'i'),
]
