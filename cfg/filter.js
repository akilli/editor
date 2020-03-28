import BrFilter from '../src/filter/BrFilter.js';
import ContentFilter from '../src/filter/ContentFilter.js';
import FigureFilter from '../src/filter/FigureFilter.js';
import TableFilter from '../src/filter/TableFilter.js';

/**
 * Filter configuration
 *
 * @type {Object.<String, Filter>}
 */
export default {
    content: editor => new ContentFilter(editor),
    br: editor => new BrFilter(editor),
    figure: editor => new FigureFilter(editor),
    table: editor => new TableFilter(editor),
}
