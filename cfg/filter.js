import BreakFilter from '../src/editor/BreakFilter.js';
import ContentFilter from '../src/editor/ContentFilter.js';
import FigureFilter from '../src/figure/FigureFilter.js';
import TableFilter from '../src/table/TableFilter.js';

/**
 * Filter configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new ContentFilter(editor, 'content'),
    editor => new FigureFilter(editor, 'figure'),
    editor => new TableFilter(editor, 'table'),
    editor => new BreakFilter(editor, 'break'),
]
