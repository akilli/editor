import BreakFilter from '../src/editor/BreakFilter.js';
import ContentFilter from '../src/editor/ContentFilter.js';
import FigureFilter from '../src/figure/FigureFilter.js';
import TableFilter from '../src/table/TableFilter.js';

/**
 * Filter configuration
 *
 * @type {Object.<String, Filter>}
 */
export default {
    content: editor => new ContentFilter(editor),
    break: editor => new BreakFilter(editor),
    figure: editor => new FigureFilter(editor),
    table: editor => new TableFilter(editor),
}
